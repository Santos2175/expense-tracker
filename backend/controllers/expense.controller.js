const Expense = require('../models/expense.model');

// Add expense handler
const addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;
    // Validate input
    if (!category || !amount || !date) {
      return res.status(400).json({
        success: false,
        message: `All fields are required: category, amount, date`,
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res
      .status(201)
      .json({ success: true, message: 'New expense added', newExpense });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all expense handler
const getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {};

// Download expense exel data handler
const downloadExpenseExcel = async (req, res) => {};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
