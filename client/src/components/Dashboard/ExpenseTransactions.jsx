import { LuArrowRight } from 'react-icons/lu';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>

        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      {/* transactions */}
      <div className='mt-6'>
        {transactions?.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            icon={expense.icon}
            title={expense.category}
            date={format(expense.date, 'do MMM yyyy', { locale: enUS })}
            amount={expense.amount}
            type='expense'
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
