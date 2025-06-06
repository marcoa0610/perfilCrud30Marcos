import Button from "./Button";
import "../css/GameCard.css";

const GameCard = ({ game, onEdit, onDelete }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Free Plan': '#00b894',
      'Premium': '#fdcb6e', 
      'Pro': '#6c5ce7',
      'Expert': '#2d3436'
    };
    return colors[difficulty] || '#74b9ff';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'PC': '💻',
      'PlayStation': '🎮',
      'Xbox': '🎯',
      'Nintendo': '🎌',
      'Mobile': '📱',
      'VR': '🥽'
    };
    return icons[platform] || '🎮';
  };

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div className="game-icon">🎮</div>
        <div className="game-year">{game.lanzamiento}</div>
      </div>
      
      <div className="game-card-body">
        <h3 className="game-title">{game.juego}</h3>
        <div className="game-id">ID: {game.id}</div>
        
        <div className="game-info">
          <div className="info-item">
            <span className="info-label">Género:</span>
            <span className="genre-badge">🎯 {game.genero}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Dificultad:</span>
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(game.dificultad) }}
            >
              {game.dificultad}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Plataforma:</span>
            <span className="platform-badge">
              {getPlatformIcon(game.plataforma)} {game.plataforma}
            </span>
          </div>
        </div>
      </div>
      
      <div className="game-card-actions">
        <Button 
          text="✏️ Editar" 
          onClick={onEdit}
          className="edit-btn"
        />
        <Button 
          text="🗑️ Eliminar" 
          onClick={onDelete}
          className="delete-btn"
        />
      </div>
    </div>
  );
};

export default GameCard;