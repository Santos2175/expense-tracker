import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../api/axiosInstance';
import { API_PATHS } from '../../api/config';

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data.incomes);
      }
    } catch (error) {
      console.error('Something went wrong. Please try again.', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = () => {};

  // Handle delete income
  const handleDeleteIncome = () => {};

  // Handle download income details
  const handleDownloadIncomeDetails = () => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;
