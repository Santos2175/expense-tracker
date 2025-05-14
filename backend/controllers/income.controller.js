const User = require('../models/user.model');
const Income = require('../models/income.model');

// Add income handler
const addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validate inputs
    if (!source || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: `All fields are required: source, amount, date`,
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res
      .status(201)
      .json({ success: true, message: `New Income added`, newIncome });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all incomes handler
const getAllIncome = (req, res) => {};

// Delete income handler
const deleteIncome = (req, res) => {};

// Download income handler
const downloadIncomeExcel = (req, res) => {};

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
};
