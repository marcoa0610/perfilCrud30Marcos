import "../css/Button.css"; // Assuming you have a CSS file for styling

const Button = ({ 
  text, 
  onClick, 
  type = "primary", 
  size = "medium", 
  disabled = false,
  icon = null 
}) => {
  return (
    <button
      className={`custom-btn custom-btn--${type} custom-btn--${size} ${disabled ? 'custom-btn--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{text}</span>
    </button>
  );
};

export default Button;