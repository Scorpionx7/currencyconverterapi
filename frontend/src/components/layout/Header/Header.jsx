import { DollarSign, TrendingUp } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-icon-wrapper">
          <DollarSign className="header-icon-primary" />
          <TrendingUp className="header-icon-secondary" />
        </div>
        <div className="header-text">
          <h1 className="header-title">Conversor de Moedas</h1>
          <p className="header-subtitle">
            Converta moedas em tempo real com taxas atualizadas
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;