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
        .json({ success: false, error: `Email already in use` });
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
const loginUser = async (req, res) => {};

// Handler to get the user info
const getUserInfo = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
