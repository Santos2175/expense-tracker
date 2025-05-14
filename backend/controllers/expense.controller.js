const xlsx = require('xlsx');
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
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if expense exists
    const expense = await Expense.findById(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: `Expense not found` });
    }

    await Expense.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: `Expense deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Download expense exel data handler
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for excel sheet
    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Expense');
    xlsx.writeFile(wb, 'expense_detail.xlsx');
    res.download('expense_detail.xlsx');
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
