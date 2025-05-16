import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      {/* Card header */}
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expense Categories</h5>

        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Card content */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={format(expense.date, 'do MMM yyyy', { locale: enUS })}
            amount={expense.amount}
            type='expense'
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
