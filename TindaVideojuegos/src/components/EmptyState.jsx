import { Link } from "react-router-dom";
import "../css/EmptyState.css";

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎮</div>
      <h3 className="empty-state-title">No hay juegos en tu biblioteca</h3>
      <p className="empty-state-description">
        ¡Comienza agregando tu primer videojuego y construye tu colección perfecta!
      </p>
      <Link to="/games/add" className="empty-state-button">
        🎯 Agregar Mi Primer Juego
      </Link>
    </div>
  );
};

export default EmptyState;