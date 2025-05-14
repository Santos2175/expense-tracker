const xlsx = require('xlsx');
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
const getAllIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json({ success: true, incomes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete income handler
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the income exists
    const income = await Income.findById(id);

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: `Income not found` });
    }

    // Delete the income with given id
    await Income.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: `Income deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Download income handler
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for excel sheet
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Income');
    xlsx.writeFile(wb, 'income_detail.xlsx');
    res.download('income_detail.xlsx');
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
};
