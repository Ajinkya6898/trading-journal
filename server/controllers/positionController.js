const PositionEntry = require("../model/PositionEntry");

exports.createPosition = async (req, res) => {
  try {
    const {
      stockName,
      investAmount,
      stockPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent, // 🔹 added
      exitPrice, // 🔹 added
    } = req.body;

    const requiredFields = {
      stockName,
      investAmount,
      stockPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent, // 🔹 added
      exitPrice, // 🔹 added
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

    const newEntry = await PositionEntry.create(requiredFields);

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Create Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getUserPositions = async (req, res) => {
  try {
    const entries = await PositionEntry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Get Positions Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      stockName,
      investAmount,
      stockPrice,
      positionSize,
      atr,
      atrMultiplier,
      partialTarget,
      partialSellQty,
      hardsl,
      exitReturnPercent, // 🔹 added
      exitPrice, // 🔹 added
    } = req.body;

    const updated = await PositionEntry.findByIdAndUpdate(
      id,
      {
        stockName,
        investAmount,
        stockPrice,
        positionSize,
        atr,
        atrMultiplier,
        partialTarget,
        partialSellQty,
        hardsl,
        exitReturnPercent, // 🔹 added
        exitPrice, // 🔹 added
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PositionEntry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Delete Position Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
