import { createContext, useReducer } from 'react';

const ACTIONS = {
  SET_FROM_CURRENCY: 'SET_FROM_CURRENCY',
  SET_TO_CURRENCY: 'SET_TO_CURRENCY',
  SWAP_CURRENCIES: 'SWAP_CURRENCIES',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
  fromCurrency: 'USD',
  toCurrency: 'BRL',
  loading: false,
  error: null,
};

const currencyReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FROM_CURRENCY:
      return {
        ...state,
        fromCurrency: action.payload,
        error: null,
      };

    case ACTIONS.SET_TO_CURRENCY:
      return {
        ...state,
        toCurrency: action.payload,
        error: null,
      };

    case ACTIONS.SWAP_CURRENCIES:
      return {
        ...state,
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
        error: null,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const actions = {
    setFromCurrency: currency =>
      dispatch({ type: ACTIONS.SET_FROM_CURRENCY, payload: currency }),

    setToCurrency: currency =>
      dispatch({ type: ACTIONS.SET_TO_CURRENCY, payload: currency }),

    swapCurrencies: () => dispatch({ type: ACTIONS.SWAP_CURRENCIES }),

    setLoading: loading =>
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),

    setError: error => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),

    clearError: () => dispatch({ type: ACTIONS.CLEAR_ERROR }),
  };

  const value = {
    state,
    actions,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

