import { RefreshCw, TrendingUp } from 'lucide-react';
import { useExchangeRates } from '../../../hooks/useExchangeRates';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { getCurrencyInfo } from '../../../utils/helpers';
import Button from '../../ui/Button/Button';
import Alert from '../../ui/Alert/Alert';
import './ExchangeRatesTable.css';

const ExchangeRatesTable = ({ baseCurrency = 'USD' }) => {
  const { rates, loading, error, lastUpdate, refreshRates, clearError } = useExchangeRates(baseCurrency);

  const handleRefresh = () => {
    refreshRates();
  };

  if (loading && !rates) {
    return (
      <div className="rates-table">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando taxas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rates-table">
      <div className="rates-header">
        <div className="rates-title">
          <TrendingUp className="rates-icon" />
          <h3>Taxas de Câmbio ({baseCurrency})</h3>
        </div>
        <Button
          variant="outline"
          size="small"
          onClick={handleRefresh}
          loading={loading}
        >
          <RefreshCw className={`refresh-icon ${loading ? 'spinning' : ''}`} />
          Atualizar
        </Button>
      </div>

      {lastUpdate && (
        <p className="last-update">
          Última atualização: {formatDate(lastUpdate)}
        </p>
      )}

      {error && (
        <Alert 
          type="error"
          message={error}
          dismissible
          onClose={clearError}
        />
      )}

      {rates?.rates && (
        <div className="rates-list">
          {Object.entries(rates.rates).map(([currency, rate]) => {
            const currencyInfo = getCurrencyInfo(currency);
            
            return (
              <div key={currency} className="rate-item">
                <div className="currency-info">
                  <span className="currency-flag">{currencyInfo.flag}</span>
                  <div className="currency-details">
                    <span className="currency-code">{currency}</span>
                    <span className="currency-name">{currencyInfo.name}</span>
                  </div>
                </div>
                <div className="rate-value">
                  <span className="rate-number">{formatCurrency(rate, 6)}</span>
                  <span className="rate-label">por 1 {baseCurrency}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !rates?.rates && (
        <div className="empty-state">
          <TrendingUp className="empty-icon" />
          <p>Nenhuma taxa disponível</p>
          <Button variant="outline" onClick={handleRefresh}>
            Tentar novamente
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExchangeRatesTable;