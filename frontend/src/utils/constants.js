export const CURRENCIES = [
  { code: 'USD', name: 'Dólar Americano', flag: '🇺🇸', symbol: '$' },
  { code: 'BRL', name: 'Real Brasileiro', flag: '🇧🇷', symbol: 'R$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', flag: '🇬🇧', symbol: '£' },
  { code: 'JPY', name: 'Iene Japonês', flag: '🇯🇵', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', flag: '🇨🇦', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', flag: '🇦🇺', symbol: 'A$' },
  { code: 'CHF', name: 'Franco Suíço', flag: '🇨🇭', symbol: 'Fr' },
  { code: 'CNY', name: 'Yuan Chinês', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Rupia Indiana', flag: '🇮🇳', symbol: '₹' },
  { code: 'KRW', name: 'Won Sul-Coreano', flag: '🇰🇷', symbol: '₩' },
  { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', symbol: '$' },
  { code: 'SGD', name: 'Dólar de Singapura', flag: '🇸🇬', symbol: 'S$' },
  { code: 'SEK', name: 'Coroa Sueca', flag: '🇸🇪', symbol: 'kr' },
  { code: 'NOK', name: 'Coroa Norueguesa', flag: '🇳🇴', symbol: 'kr' }
];

export const API_ENDPOINTS = {
  LATEST_RATES: '/latest',
  CONVERT: '/convert'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  INVALID_AMOUNT: 'Por favor, insira um valor válido maior que zero',
  INVALID_CURRENCY: 'Moeda selecionada não é válida',
  CONVERSION_ERROR: 'Erro ao converter moeda',
  RATES_ERROR: 'Erro ao buscar taxas de câmbio'
};

export const SUCCESS_MESSAGES = {
  CONVERSION_SUCCESS: 'Conversão realizada com sucesso!',
  RATES_UPDATED: 'Taxas atualizadas com sucesso!'
};