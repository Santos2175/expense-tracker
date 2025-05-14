const { Router } = require('express');

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require('../controllers/expense.controller');

const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

// Expense API routes
router.post('/add', authenticate, addExpense);
router.get('/get', authenticate, getAllExpense);
router.delete('/:id', authenticate, deleteExpense);
router.get('/download-excel', authenticate, downloadExpenseExcel);

router.module.exports = router;
