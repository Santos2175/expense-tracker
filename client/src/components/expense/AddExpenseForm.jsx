import { useState } from 'react';
import EmojiPickerPopup from '../ui/EmojiPickerPopup';
import Input from '../ui/Input';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    icon: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label='Expense Category'
        placeholder='food, rent, etc..'
        type='text'
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label='Amount'
        placeholder=''
        type='text'
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label='Date'
        placeholder=''
        type='date'
      />

      <div className='flex justify-end mt-6'>
        <button
          type='button'
          onClick={() => onAddExpense(expense)}
          className='add-btn add-btn-fill'>
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
