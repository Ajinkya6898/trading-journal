const mongoose = require("mongoose");
const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    targetReturnPercent: { type: Number, required: true },
    goalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "completed", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", GoalSchema);
