const { Router } = require('express');

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require('../controllers/income.controller');

const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

// API routes for income
router.post('/add', authenticate, addIncome);
router.get('/get', authenticate, getAllIncome);
router.get('/download-excel', authenticate, downloadIncomeExcel);
router.delete('/:id', authenticate, deleteIncome);

module.exports = router;
