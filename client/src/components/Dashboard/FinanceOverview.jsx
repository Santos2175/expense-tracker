import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ['#875cf5', '#fa2c37', '#ff6900'];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: 'Total Balance', amount: totalBalance },
    { name: 'Total Expenses', amount: totalExpenses },
    { name: 'Total Income', amount: totalIncome },
  ];
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label='Total Balance'
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
