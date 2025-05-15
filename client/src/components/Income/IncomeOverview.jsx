import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import { useState, useEffect } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className='card'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt=0.5'>
            Track your income over time and analyze your income trend.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      {/* Income Contents */}
      <div className='mt-10'>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
