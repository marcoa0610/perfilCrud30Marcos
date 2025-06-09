import React from 'react';
import '../css/GameTable.css';

const GameTable = ({ games, onEdit, onDelete, dificultadLabels }) => {
  const formatYear = (year) => {
    return year ? year.toString() : 'N/A';
  };

  const getDifficultyBadge = (difficulty) => {
    const badgeClasses = {
      'fa': 'difficulty-easy',
      'me': 'difficulty-medium',
      'di': 'difficulty-hard'
    };
    
    return `difficulty-badge ${badgeClasses[difficulty] || 'difficulty-medium'}`;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'PlayStation': '🎮',
      'Xbox': '🎯',
      'Nintendo Switch': '🕹️',
      'PC': '💻',
      'Play Station': '🎮'
    };
    return icons[platform] || '🎮';
  };

  if (!games || games.length === 0) {
    return (
      <div className="empty-table">
        <div className="empty-icon">🎮</div>
        <h3>No hay juegos en tu colección</h3>
        <p>¡Comienza agregando tu primer videojuego!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>📊 {games.length} Videojuego{games.length !== 1 ? 's' : ''} en tu colección</h3>
      </div>
      
      <div className="table-wrapper">
        <table className="games-table">
          <thead>
            <tr>
              <th>🎮 Juego</th>
              <th>🎯 Género</th>
              <th>⚡ Dificultad</th>
              <th>🕹️ Plataforma</th>
              <th>📅 Año</th>
              <th>⚙️ Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={game.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                <td className="game-title">
                  <div className="game-info">
                    <span className="game-name">{game.juego}</span>
                  </div>
                </td>
                <td className="genre-cell">
                  <span className="genre-tag">{game.genero}</span>
                </td>
                <td className="difficulty-cell">
                  <span className={getDifficultyBadge(game.dificultad)}>
                    {dificultadLabels[game.dificultad] || game.dificultad}
                  </span>
                </td>
                <td className="platform-cell">
                  <div className="platform-info">
                    <span className="platform-icon">
                      {getPlatformIcon(game.plataforma)}
                    </span>
                    <span className="platform-name">{game.plataforma}</span>
                  </div>
                </td>
                <td className="year-cell">
                  <span className="year-badge">{formatYear(game.lanzamiento)}</span>
                </td>
                <td className="actions-cell">
                  <div className="action-buttons">
                   <button 
  onClick={() => onEdit(game)}  // ✅ Ahora pasa el objeto completo
  className="btn-edit"
  title="Editar juego"
>
  ✏️
</button>
                    <button 
                      onClick={() => onDelete(game.id)}
                      className="btn-delete"
                      title="Eliminar juego"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;