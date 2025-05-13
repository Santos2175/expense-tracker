const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    throw new Error(`Token generation failed`, error.message);
  }
};

module.exports = {
  generateToken,
};
