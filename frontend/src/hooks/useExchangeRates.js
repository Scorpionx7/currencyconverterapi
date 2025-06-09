import { useState, useEffect, useCallback } from 'react';
import currencyService from '../services/currencyService';

export const useExchangeRates = (baseCurrency = 'USD', autoFetch = true) => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = useCallback(
    async (base = baseCurrency) => {
      try {
        setLoading(true);
        setError(null);

        const data = await currencyService.getLatestRates(base);
        setRates(data);
        setLastUpdate(new Date());
        return data;
      } catch (err) {
        const errorMessage = err.message || 'Erro ao buscar taxas de câmbio';
        setError(errorMessage);
        setRates(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseCurrency]
  );

  const refreshRates = useCallback(() => {
    return fetchRates(baseCurrency);
  }, [fetchRates, baseCurrency]);

  const getRateForCurrency = useCallback(
    currency => {
      if (!rates?.rates) return null;
      return rates.rates[currency.toUpperCase()] || null;
    },
    [rates]
  );

  const getTopCurrencies = useCallback(
    (count = 10) => {
      if (!rates?.rates) return [];

      return Object.entries(rates.rates)
        .slice(0, count)
        .map(([code, rate]) => ({ code, rate }));
    },
    [rates]
  );

  // Auto-fetch quando baseCurrency muda
  useEffect(() => {
    if (autoFetch) {
      fetchRates(baseCurrency);
    }
  }, [baseCurrency, autoFetch, fetchRates]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    rates,
    loading,
    error,
    lastUpdate,
    fetchRates,
    refreshRates,
    getRateForCurrency,
    getTopCurrencies,
    clearError,
  };
};
