const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Section 1: Personal Info
  fullName: { type: String },
  dob: { type: Date },
  phone: { type: String },
  gender: { type: String },
  country: { type: String },
  profession: { type: String },

  // Section 2: Address
  address: {
    addressLine: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },

  // Section 3: Trading Info
  primaryPlatform: String,
  accountType: String,
  yearsTrading: Number,
  tradingStyle: String,

  // Section 4: Preferences
  receiveTips: Boolean,
  darkMode: Boolean,
  emailUpdatesL: Boolean,
  investmentGoals: [String],

  communicationPrefs: {
    newsletter: Boolean,
    alerts: Boolean,
  },
  profileCompleted: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
