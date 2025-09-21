const StockEntry = require("../model/StocksSchema");
const FundTransaction = require("../model/FundTransaction");
const MutualFundEntry = require("../model/MutualFundSchema");
const sanitizeHtml = require("sanitize-html");

const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getAIInsights = async (req, res) => {
  try {
    // Debug: Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return res.status(500).json({
        message: "AI service configuration error",
        error: "API key not configured",
      });
    }

    console.log(
      "API Key configured, length:",
      process.env.GEMINI_API_KEY.length
    );

    // 1. Fetch all trading & fund data
    const stocks = await StockEntry.find().lean();
    const funds = await FundTransaction.find().lean();
    const mutualFunds = await MutualFundEntry.find().lean();

    console.log(
      "Data fetched - Stocks:",
      stocks.length,
      "Funds:",
      funds.length,
      "MF:",
      mutualFunds.length
    );

    // 2. Prepare summary text for AI
    const tradesSummary = stocks
      .map((t) => {
        return `Stock: ${t.symbol}, Entry: ${t.boughtPrice}, Exit: ${
          t.soldPrice || "Not sold"
        }, Qty: ${t.quantity}, PnL: ${t.pnl || "N/A"}, Notes: ${
          t.notes || "N/A"
        }`;
      })
      .join("\n");

    const fundSummary = funds
      .map((f) => {
        return `Fund Txn: Amount: ${f.amount}, Date: ${f.date}, Type: ${f.type}`;
      })
      .join("\n");

    const mfSummary = mutualFunds
      .map((mf) => {
        return `Mutual Fund: ${mf.fundName}, Units: ${mf.units}, NAV: ${mf.nav}, Amount: ${mf.amount}, Date: ${mf.date}`;
      })
      .join("\n");

    const combinedData = `
    Stocks (${stocks.length} entries):
    ${tradesSummary || "No stock data available"}

    Fund Transactions (${funds.length} entries):
    ${fundSummary || "No fund transaction data available"}

    Mutual Funds (${mutualFunds.length} entries):
    ${mfSummary || "No mutual fund data available"}
    `;

    // Check if we have any data to analyze
    if (stocks.length === 0 && funds.length === 0 && mutualFunds.length === 0) {
      return res.status(200).json({
        insights:
          "No trading or investment data found to analyze. Start by adding some trades or investments to get AI insights.",
      });
    }

    console.log("Combined data length:", combinedData.length);

    // 3. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are a professional trading and investment advisor AI. Analyze the following trading, fund, and mutual fund data for a retail investor.
    
    Provide detailed insights in the following structure:
    
    ## Portfolio Analysis Summary
    - Overall portfolio performance assessment
    - Asset allocation observations
    
    ## What You Did Well
    - Highlight successful strategies and decisions
    - Positive patterns identified
    
    ## Areas for Improvement
    - Specific recommendations for better performance
    - Risk management suggestions
    
    ## Key Patterns Noticed
    - Trading behavior patterns
    - Investment timing analysis
    
    ## Actionable Recommendations
    - Concrete steps to improve returns
    - Risk mitigation strategies
    
    Data to analyze:
    ${combinedData}
    
    If there's limited data, provide general investment advice and encourage diversification.
    `;

    console.log("Sending request to Gemini...");

    // 4. Call Gemini with timeout
    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      ),
    ]);

    console.log("Gemini response received");

    const insights = result.response.text();

    if (!insights || insights.trim().length === 0) {
      throw new Error("Empty response from AI service");
    }

    // 5. Send to frontend
    res.status(200).json({ insights });
  } catch (error) {
    console.error("=== AI Insights Error Details ===");
    console.error("Error message:", error.message);
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error status:", error.status);

    // Log the full error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Full error object:", error);
    }

    // Handle specific error types
    let errorMessage = "Failed to generate AI insights";
    let statusCode = 500;

    if (error.message?.includes("API key")) {
      errorMessage = "AI service configuration error";
      statusCode = 500;
    } else if (
      error.message?.includes("quota") ||
      error.message?.includes("limit")
    ) {
      errorMessage = "AI service quota exceeded. Please try again later.";
      statusCode = 429;
    } else if (error.message?.includes("timeout")) {
      errorMessage =
        "AI service is taking too long to respond. Please try again.";
      statusCode = 408;
    } else if (
      error.message?.includes("network") ||
      error.message?.includes("fetch")
    ) {
      errorMessage = "Unable to connect to AI service. Please try again.";
      statusCode = 503;
    }

    res.status(statusCode).json({
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.getAIInsightByTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "AI API key not configured" });
    }

    const trade = await StockEntry.findById(tradeId).lean();
    if (!trade) return res.status(404).json({ message: "Trade not found" });

    const tradeSummary = `
      Symbol: ${trade.symbol || "N/A"}
      Entry: ${trade.boughtPrice ?? "N/A"}
      Exit: ${trade.soldPrice ?? "Not sold"}
      Qty: ${trade.quantity ?? "N/A"}
      PnL: ${trade.pnl ?? "N/A"}
      Notes: ${trade.notes ?? "N/A"}
      Entry Date: ${trade.entryDate ?? "N/A"}
      Exit Date: ${trade.exitDate ?? "N/A"}
      Timeframe: ${trade.timeFrame ?? "N/A"}
    `;

    const prompt = `
You are a professional swing-trading coach AI. 
Analyze the following single trade and return a detailed HTML report.
analyze it as if you had access to RSI, MACD, and support/resistance levels.
- Estimate where RSI might have been (overbought/oversold zones).
- Comment on MACD signals (crossover, divergence).
- Identify likely support/resistance levels near the entry and exit prices.
- Highlight whether the trader entered near support or exited near resistance.
Return only well-structured HTML with <h3>Technical Analysis</h3>, <ul><li> points, and clear actionable notes.
Techincal data:

### Instructions:
- Return ONLY clean, well-formed HTML (no extra commentary outside tags).
- Use <h2> for title, <h3> for sections, <p>, <ul>/<li> for lists, <strong> for emphasis, and <table> if needed.
- Do NOT include <script> tags, inline event handlers, or unsafe attributes.
- Keep the output structured, concise, and readable for a retail trader.

### Sections to include in the report:
<h2>Trade Analysis Report</h2>
<h3>Trade Overview</h3>
- Summarize entry, exit, quantity, timeframe, and pnl.

<h3>What Went Well</h3>
- Highlight positive aspects of the trade execution, such as good entry timing, profit booking, risk/reward, discipline.

<h3>Areas for Improvement</h3>
- Point out weaknesses (e.g., missing stop loss, unclear exit strategy, poor position sizing, emotional decisions).

<h3>Risk & Reward Assessment</h3>
- Estimate the risk/reward ratio using entry, exit, and (if missing) a hypothetical stop loss.
- Comment on whether the trade aligns with healthy risk/reward practices.

<h3>Patterns or Behaviors Noticed</h3>
- Identify any trading habits, recurring mistakes, or good practices.

<h3>Actionable Recommendations</h3>
- Provide 3–5 practical tips the trader can apply in future trades.

### Trade data:
${tradeSummary}
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 30000)
      ),
    ]);

    // Extract full text from candidates (avoids truncated response)
    let rawHtml = "";
    if (result?.response?.candidates?.length) {
      rawHtml = result.response.candidates
        .map((c) => c.content?.parts?.map((p) => p.text).join("") || "")
        .join("\n");
    } else if (typeof result.response?.text === "function") {
      rawHtml = result.response.text();
    } else {
      rawHtml = String(result.response || "");
    }

    if (!rawHtml || !rawHtml.trim()) {
      throw new Error("Empty response from AI service");
    }

    // Sanitize HTML before sending to client
    const cleanHtml = sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "h1",
        "h2",
        "h3",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ]),
      allowedAttributes: {
        a: ["href", "name", "target"],
        // allow align on table cells if model outputs them
        td: ["align"],
        th: ["align"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });

    // Return consistent key (insightHtml)
    res.status(200).json({ insightHtml: cleanHtml, trade });
  } catch (error) {
    console.error("AI Trade Insight Error:", error);
    res.status(500).json({
      message: "Failed to generate AI insights for this trade",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
