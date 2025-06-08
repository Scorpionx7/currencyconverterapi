import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import './Alert.css';

const Alert = ({
  type = 'info',
  message,
  onClose,
  dismissible = false,
  className = '',
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className={`alert alert--${type} ${className}`}>
      <div className="alert__content">
        <Icon className="alert__icon" />
        <span className="alert__message">{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={onClose}
          className="alert__close"
          aria-label="Fechar alerta"
        >
          <X className="alert__close-icon" />
        </button>
      )}
    </div>
  );
};

export default Alert;
