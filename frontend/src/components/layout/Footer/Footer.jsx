import { ExternalLink, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-api-info">
          <span>Dados fornecidos pela</span>
          <a
            href="https://frankfurter.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            API Frankfurter
            <ExternalLink className="footer-link-icon" />
          </a>
        </div>
        <p className="footer-update-info">
          Taxas de câmbio atualizadas diariamente
        </p>
        
        <div className="footer-developers">
          <div className="footer-developer">
            <span>Frontend:</span>
            <a 
              href="https://github.com/voidGustavoNunes"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Gustavo Nunes Guedes
              <Github className="footer-link-icon" />
            </a>
          </div>
          <div className="footer-developer">
            <span>Backend:</span>
            <a 
              href="https://github.com/Scorpionx7"
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              Esther Rezende
              <Github className="footer-link-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;