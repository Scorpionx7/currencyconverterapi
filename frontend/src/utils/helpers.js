import { CURRENCIES } from './constants';

export const getCurrencyInfo = currencyCode => {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  return (
    currency || {
      code: currencyCode,
      name: currencyCode,
      flag: '💱',
      symbol: currencyCode,
    }
  );
};