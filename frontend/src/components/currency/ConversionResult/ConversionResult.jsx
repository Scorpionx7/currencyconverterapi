import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { formatCurrency } from '../../../utils/formatters';
import { CURRENCIES } from '../../../utils/constants';
import './ConversionResult.css';

const ConversionResult = ({
  originalAmount,
  fromCurrency,
  toCurrency,
  convertedAmount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `${formatCurrency(originalAmount)} ${fromCurrency} = ${formatCurrency(convertedAmount)} ${toCurrency}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getFlag = (currencyCode) => {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    return currency?.flag || '💱';
  };

  const exchangeRate = convertedAmount / originalAmount;

  return (
    <div className="conversion-result">
      <div className="result-header">
        <span>Resultado da Conversão</span>
      </div>

      <div className="result-amounts">
        <div className="amount-display">
          <span className="currency-flag">{getFlag(fromCurrency)}</span>
          <span className="amount-original">
            {formatCurrency(originalAmount)} {fromCurrency}
          </span>
        </div>

        <div className="equals-sign">=</div>

        <div className="amount-display">
          <span className="currency-flag">{getFlag(toCurrency)}</span>
          <span className="amount-converted">
            {formatCurrency(convertedAmount)} {toCurrency}
          </span>
        </div>
      </div>

      <div className="exchange-rate">
        <span>
          1 {fromCurrency} = {formatCurrency(exchangeRate, 6)} {toCurrency}
        </span>
      </div>

      <Button
        variant="outline"
        size="small"
        onClick={handleCopy}
        className="copy-button"
      >
        {copied ? (
          <>
            <CheckCircle className="button-icon" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="button-icon" />
            Copiar
          </>
        )}
      </Button>
    </div>
  );
};

export default ConversionResult;
