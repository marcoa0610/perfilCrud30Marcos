import Button from "./Button";
import "../css/GameCard.css"; // Assuming you have a CSS file for styling

const GameCard = ({ game, onEdit, onDelete, dificultadLabel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'PlayStation': '🎮',
      'Xbox': '🎯',
      'Nintendo Switch': '🕹️',
      'PC': '💻',
      'Mobile': '📱'
    };
    return icons[platform] || '🎮';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'fa': '#28a745', // Verde para fácil
      'me': '#ffc107', // Amarillo para medio
      'di': '#dc3545'  // Rojo para difícil
    };
    return colors[difficulty] || '#6c757d';
  };

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div className="game-platform">
          <span className="platform-icon">{getPlatformIcon(game.plataforma)}</span>
          <span className="platform-text">{game.plataforma}</span>
        </div>
        <div 
          className="game-difficulty"
          style={{ backgroundColor: getDifficultyColor(game.dificultad) }}
        >
          {dificultadLabel}
        </div>
      </div>

      <div className="game-card-body">
        <h3 className="game-title">{game.juego}</h3>
        <div className="game-genre">
          <span className="genre-icon">🏷️</span>
          <span className="genre-text">{game.genero}</span>
        </div>
        <div className="game-release">
          <span className="release-icon">📅</span>
          <span className="release-text">{formatDate(game.fechaLanzamiento)}</span>
        </div>
      </div>

      <div className="game-card-footer">
        <Button 
          text="Editar" 
          onClick={onEdit}
          type="primary"
          size="small"
          icon="✏️"
        />
        <Button 
          text="Eliminar" 
          onClick={onDelete}
          type="danger"
          size="small"
          icon="🗑️"
        />
      </div>

      <div className="game-card-overlay">
        <div className="overlay-content">
          <h4>Información del Juego</h4>
          <p><strong>Título:</strong> {game.juego}</p>
          <p><strong>Género:</strong> {game.genero}</p>
          <p><strong>Plataforma:</strong> {game.plataforma}</p>
          <p><strong>Dificultad:</strong> {dificultadLabel}</p>
          <p><strong>Lanzamiento:</strong> {formatDate(game.fechaLanzamiento)}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;