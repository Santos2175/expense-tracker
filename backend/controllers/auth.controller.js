const User = require('../models/user.model');
const { generateToken } = require('../utils/token');

// Handler to register user
const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validate all inputs
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: fullName,email,password',
    });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: `Email already in use` });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      success: true,
      message: `User created successfully`,
      data: {
        id: user._id,
        user,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handler to login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: email, password',
    });
  }

  try {
    // check credentials
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: `Invalid Credentials` });
    }

    res.status(200).json({
      success: true,
      message: `User logged in successfully`,
      data: {
        id: user._id,
        user,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Handler to get the user info
const getUserInfo = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
