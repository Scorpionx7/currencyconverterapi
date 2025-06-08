import { useState } from 'react';
import { ArrowUpDown, Calculator } from 'lucide-react';
import { useCurrencyConverter } from '../../../hooks/useCurrencyConverter';
import { useCurrencyHistory } from '../../../hooks/useCurrencyHistory';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import ConversionResult from '../ConversionResult/ConversionResult';
import Alert from '../../ui/Alert/Alert';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');

  const { convert, loading, error, result, clearError } = useCurrencyConverter();
  const { addConversion } = useCurrencyHistory();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      clearError();
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    const conversionResult = await convert(numericAmount, fromCurrency, toCurrency);

    if (conversionResult) {
      addConversion(conversionResult);
    }
  };

  const isFormValid = amount && parseFloat(amount) > 0 && fromCurrency && toCurrency;

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <Calculator className="converter-icon" />
        <h2>Conversor de Moedas</h2>
      </div>

      <form onSubmit={handleConvert} className="converter-form">
        {/*campo de valor*/}
        <div className="form-group">
          <Input
            label="Valor"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Digite o valor"
            required
          />
        </div>

        {/*selecao de noedas*/}
        <div className="currency-selection">
          <div className="currency-field">
            <CurrencySelect
              label="De"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="medium"
            onClick={handleSwapCurrencies}
            className="swap-button"
            title="Trocar moedas"
          >
            <ArrowUpDown className="swap-icon" />
          </Button>

          <div className="currency-field">
            <CurrencySelect
              label="Para"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>

        {/*botao de conversao*/}
        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={loading}
          disabled={!isFormValid}
          className="convert-button"
        >
          {loading ? 'Convertendo...' : 'Converter'}
        </Button>
      </form>

      {/*resultado da conversao*/}
      {result && (
        <ConversionResult
          originalAmount={result.originalAmount}
          fromCurrency={result.fromCurrency}
          toCurrency={result.toCurrency}
          convertedAmount={result.convertedAmount}
        />
      )}

      {/*alerta de erro*/}
      {error && (
        <Alert 
          type="error" 
          message={error} 
          onClose={clearError} 
          dismissible 
        />
      )}
    </div>
  );
};

export default CurrencyConverter;
