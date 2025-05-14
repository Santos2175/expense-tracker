import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router';
import axiosInstance from '../../api/axiosInstance';
import { API_PATHS } from '../../api/config';

import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error(`Something went wrong. Please try again.`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label='Total Balance'
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color='bg-primary'
          />
          <InfoCard
            icon={<LuHandCoins />}
            label='Total Income'
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color='bg-orange-500'
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label='Total Expense'
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color='bg-red-500'
          />
        </div>

        {/* Recent Transactions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/expense')}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
