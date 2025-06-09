import apiService from './api';

class CurrencyService {
  async getLatestRates(baseCurrency = 'USD') {
    try {
      const data = await apiService.get('/latest', { base: baseCurrency });
      return data;
    } catch (error) {
      console.error('Erro ao buscar taxas:', error);
      throw new Error('Falha ao buscar taxas de câmbio');
    }
  }

  async convertCurrency(amount, from, to) {
    try {
      const data = await apiService.get('/convert', {
        amount: amount.toString(),
        from: from.toUpperCase(),
        to: to.toUpperCase(),
      });
      return data;
    } catch (error) {
      console.error('Erro na conversão:', error);
      throw new Error(error.message || 'Falha na conversão de moeda');
    }
  }
}

export default new CurrencyService();
