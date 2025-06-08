import { CurrencyProvider } from './context/CurrencyContext';
import Container from './components/layout/Container/Container';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import CurrencyConverter from './components/currency/CurrencyConverter/CurrencyConverter';
import ExchangeRatesTable from './components/currency/ExchangeRatesTable/ExchangeRatesTable';
import './App.css';

function App() {
  return (
    <CurrencyProvider>
      <div className="app">
        <Container>
          <Header />
          
          <main className="app-main">
            <div className="app-grid">
              {/*conversor*/}
              <div className="app-grid-item">
                <CurrencyConverter />
              </div>
              
              {/*tabela de taxas*/}
              <div className="app-grid-item">
                <ExchangeRatesTable baseCurrency="USD" />
              </div>
            </div>
          </main>
          
          <Footer />
        </Container>
      </div>
    </CurrencyProvider>
  );
}

export default App;