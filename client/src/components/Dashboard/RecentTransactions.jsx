import { LuArrowRight } from 'react-icons/lu';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>{' '}
        <button className='card-btn' onClick={onSeeMore}>
          See All
          <LuArrowRight className='text-base' />
        </button>
      </div>

      {/* Transactions */}
      <div className='mt-6'>
        {transactions?.slice(0, 6).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            date={format(item.date, 'do MMM yyyy', { locale: enUS })}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
