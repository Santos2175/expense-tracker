import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

// Function to the initials of names
export const getInitials = (name) => {
  if (!name) return;

  let initials = '';
  let words = name.split(' ');

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials;
};

// Function to format number
export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return '';

  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

// Utility function to prepare Bar chart data
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

// utility function to prepare Income bar chart data
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: format(item?.date, 'do MMM', { locale: enUS }),
    source: item?.source,
    amount: item?.amount,
  }));

  return chartData;
};

// utility function to prepare expense line chart data
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: format(item?.date, 'do MMM', { locale: enUS }),
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};
