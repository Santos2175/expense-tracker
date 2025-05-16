import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      {/* Card header */}
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>

        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      {/* Card Content */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={format(income.date, 'do MMM yyyy', { locale: enUS })}
            amount={income.amount}
            type='income'
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
