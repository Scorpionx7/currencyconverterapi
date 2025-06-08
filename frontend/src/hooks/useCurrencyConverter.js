import { useState, useCallback } from 'react';
import currencyService from '../services/currencyService';

export const useCurrencyConverter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const convert = useCallback(async (amount, from, to) => {
    if (!amount || amount <= 0) {
      setError('Valor deve ser maior que zero');
      return null;
    }

    if (!from || !to) {
      setError('Moedas de origem e destino são obrigatórias');
      return null;
    }

    if (from === to) {
      const sameResult = {
        originalAmount: amount,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount: amount
      };
      setResult(sameResult);
      return sameResult;
    }

    try {
      setLoading(true);
      setError(null);
      
      const conversionResult = await currencyService.convertCurrency(amount, from, to);
      setResult(conversionResult);
      return conversionResult;
    } catch (err) {
      const errorMessage = err.message || 'Erro na conversão de moeda';
      setError(errorMessage);
      setResult(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    convert,
    loading,
    error,
    result,
    clearResult,
    clearError
  };
};
