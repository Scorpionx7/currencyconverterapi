import './Card.css';

const Card = ({
  children,
  title,
  className = '',
  variant = 'default'
}) => {
  return (
    <div className={`card card--${variant} ${className}`}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
        </div>
      )}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export default Card;