import "../css/Titulo.css"; // Assuming you have a CSS file for styling

const Titulo = ({ titulo, subtitle }) => {
  return (
    <div className="titulo-container">
      <h2 className="titulo-main">{titulo}</h2>
      {subtitle && <p className="titulo-subtitle">{subtitle}</p>}
      <div className="titulo-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-icon">🎮</div>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
};

export default Titulo;