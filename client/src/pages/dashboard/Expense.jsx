import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../api/axiosInstance';
import { API_PATHS } from '../../api/config';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/expense/ExpenseOverview';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response.data) {
        setExpenseData(response.data.expenses);
      }
    } catch (error) {
      console.error(
        'Something went wrong. Please try again',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, icon, date } = expense;

    // Validation checks
    if (!category.trim()) {
      toast.error('Category is required');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be valid number greater than 0');
      return;
    }

    if (!date) {
      toast.error('Date is required');
      return;
    }

    // if validation passes
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        icon,
        amount,
        date,
      });

      setOpenAddExpenseModal(false);
      toast.success('Expense detail added successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error adding expense',
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle delete expense
  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert(false);
      toast.success('Expense detail deleted successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error deleting income',
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle download expense details
  const handleDownloadExpenseDetails = () => {};

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
