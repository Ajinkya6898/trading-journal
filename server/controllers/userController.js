const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const JWT_SECRET = "your_secret_key_here";

// @desc    Register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ email, password });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      token,
      isNewUser: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    res.json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update profile
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const {
    fullName,
    dob,
    phone,
    gender,
    country,
    profession,
    experience,
    address,
    primaryPlatform,
    accountType,
    yearsTrading,
    tradingStyle,
    receiveTips,
    darkMode,
    emailUpdatesL,
    investmentGoals,
    communicationPrefs,
  } = req.body;

  if (!fullName || !dob || !phone || !gender || !country || !profession) {
    return res
      .status(400)
      .json({ message: "Personal information is required." });
  }

  user.fullName = fullName;
  user.dob = dob;
  user.phone = phone;
  user.gender = gender;
  user.country = country;
  user.profession = profession;

  if (address) user.address = address;
  if (primaryPlatform) user.primaryPlatform = primaryPlatform;
  if (accountType) user.accountType = accountType;
  if (yearsTrading != null) user.yearsTrading = yearsTrading;
  if (tradingStyle) user.tradingStyle = tradingStyle;
  if (receiveTips != null) user.receiveTips = receiveTips;
  if (darkMode != null) user.darkMode = darkMode;
  if (emailUpdatesL != null) user.emailUpdatesL = emailUpdatesL;
  if (investmentGoals) user.investmentGoals = investmentGoals;
  if (communicationPrefs) user.communicationPrefs = communicationPrefs;

  user.profileCompleted = true;

  await user.save();

  res.status(200).json({ message: "Profile updated successfully." });
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getMyProfile,
};
