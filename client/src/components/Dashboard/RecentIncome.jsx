import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Incomes</h5>

        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      {/* transactions */}
      <div className='mt-6'>
        {transactions?.slice(0, 5).map((income) => (
          <TransactionInfoCard
            key={income._id}
            icon={income.icon}
            title={income.source}
            date={format(income.date, 'do MMM yyyy', { locale: enUS })}
            amount={income.amount}
            type='income'
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
