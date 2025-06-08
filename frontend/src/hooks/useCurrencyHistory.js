import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCurrencyHistory = () => {
  const [history, setHistory, removeHistory] = useLocalStorage(
    'currency-conversion-history',
    []
  );

  const addConversion = useCallback(
    conversion => {
      const newConversion = {
        ...conversion,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };

      setHistory(prev => {
        const updated = [newConversion, ...prev].slice(0, 50);
        return updated;
      });

      return newConversion;
    },
    [setHistory]
  );

  const removeConversion = useCallback(
    id => {
      setHistory(prev => prev.filter(item => item.id !== id));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    removeHistory();
  }, [removeHistory]);

  const getRecentConversions = useCallback(
    (limit = 10) => {
      return history.slice(0, limit);
    },
    [history]
  );

  const getConversionsByDate = useCallback(
    date => {
      const targetDate = new Date(date).toDateString();
      return history.filter(item => {
        const itemDate = new Date(item.timestamp).toDateString();
        return itemDate === targetDate;
      });
    },
    [history]
  );

  return {
    history,
    addConversion,
    removeConversion,
    clearHistory,
    getRecentConversions,
    getConversionsByDate,
  };
};
