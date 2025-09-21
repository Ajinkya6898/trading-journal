// controllers/riskBasedPositionController.js

const RiskBasedPositionEntry = require("../model/RiskPosition");

// ✅ Create a new Risk-Based Position
exports.createRiskPosition = async (req, res) => {
  try {
    const {
      stockName,
      totalCapital,
      riskPercent,
      riskAmount,
      entryPrice,
      stopLossPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent,
      exitPrice,
    } = req.body;

    // 🔹 Required fields validation
    const requiredFields = {
      stockName,
      totalCapital,
      riskPercent,
      riskAmount,
      entryPrice,
      stopLossPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent,
      exitPrice,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([_, value]) => value === undefined || value === null || value === ""
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const newEntry = await RiskBasedPositionEntry.create(requiredFields);

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Create Risk-Based Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Get all Risk-Based Positions
exports.getRiskPositions = async (req, res) => {
  try {
    const entries = await RiskBasedPositionEntry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Get Risk-Based Positions Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Update Risk-Based Position
exports.updateRiskPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      stockName,
      totalCapital,
      riskPercent,
      stockPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent,
      exitPrice,
    } = req.body;

    const updated = await RiskBasedPositionEntry.findByIdAndUpdate(
      id,
      {
        stockName,
        totalCapital,
        riskPercent,
        stockPrice,
        positionSize,
        atr,
        atrMultiplier,
        partialTarget,
        partialSellQty,
        hardsl,
        exitReturnPercent,
        exitPrice,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Risk-Based Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// ✅ Delete Risk-Based Position
exports.deleteRiskPosition = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await RiskBasedPositionEntry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Delete Risk-Based Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
