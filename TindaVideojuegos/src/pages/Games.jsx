import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useDataGame from '../hooks/users/UseDataGame';
import useFetchGames from '../hooks/users/UseFetchGame';
import '../css/Games.css';

const Games = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { gameData, errors, handleInputChange, validateForm, resetForm, setInitialData } = useDataGame();
  const { games, addGame, updateGame } = useFetchGames();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id && games) {
      const gameToEdit = games.find(game => game.id === parseInt(id));
      if (gameToEdit) {
        setInitialData(gameToEdit);
        setIsEditMode(true);
      }
    }
  }, [id, games, setInitialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const gamePayload = {
        ...gameData,
        lanzamiento: parseInt(gameData.lanzamiento)
      };

      if (isEditMode) {
        await updateGame(parseInt(id), gamePayload);
      } else {
        await addGame(gamePayload);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetForm();
  };

  const generos = [
    { value: '', label: 'Selecciona un género' },
    { value: 'Acción', label: '💥 Acción' },
    { value: 'Aventura', label: '🗡️ Aventura' },
    { value: 'RPG', label: '⚔️ RPG' },
    { value: 'Estrategia', label: '🧠 Estrategia' },
    { value: 'Deportes', label: '🏃 Deportes' },
    { value: 'Carreras', label: '🏎️ Carreras' },
    { value: 'Simulación', label: '🎮 Simulación' },
    { value: 'Puzzle', label: '🧩 Puzzle' },
    { value: 'Horror', label: '👻 Horror' },
    { value: 'Lucha', label: '🥊 Lucha' }
  ];

  const dificultades = [
    { value: '', label: 'Selecciona la dificultad' },
    { value: 'fa', label: '🟢 Fácil' },
    { value: 'me', label: '🟡 Medio' },
    { value: 'di', label: '🔴 Difícil' }
  ];

  const plataformas = [
    { value: '', label: 'Selecciona una plataforma' },
    { value: 'PlayStation', label: '🎮 PlayStation' },
    { value: 'Xbox', label: '🎯 Xbox' },
    { value: 'Nintendo Switch', label: '🕹️ Nintendo Switch' },
    { value: 'PC', label: '💻 PC' },
    { value: 'Mobile', label: '📱 Mobile' }
  ];

  return (
    <div className="games-container">
      <div className="games-header">
        <div className="header-content">
          <Link to="/" className="back-btn">
            <span className="back-icon">←</span>
            Volver al Catálogo
          </Link>
          <h1 className="page-title">
            {isEditMode ? '✏️ Editar Videojuego' : '🎮 Agregar Nuevo Videojuego'}
          </h1>
          <p className="page-subtitle">
            {isEditMode 
              ? 'Actualiza la información de tu videojuego'
              : 'Completa la información para añadir un nuevo juego a tu colección'
            }
          </p>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="game-form">
          <div className="form-grid">
            
            {/* Nombre del Juego */}
            <div className="form-group full-width">
              <label htmlFor="juego" className="form-label">
                🎯 Nombre del Videojuego
              </label>
              <input
                type="text"
                id="juego"
                name="juego"
                value={gameData.juego}
                onChange={handleInputChange}
                className={`form-input ${errors.juego ? 'error' : ''}`}
                placeholder="Ej: The Legend of Zelda: Breath of the Wild"
                maxLength="100"
              />
              {errors.juego && <span className="error-message">{errors.juego}</span>}
            </div>

            {/* Género */}
            <div className="form-group">
              <label htmlFor="genero" className="form-label">
                🎭 Género
              </label>
              <select
                id="genero"
                name="genero"
                value={gameData.genero}
                onChange={handleInputChange}
                className={`form-select ${errors.genero ? 'error' : ''}`}
              >
                {generos.map(genero => (
                  <option key={genero.value} value={genero.value}>
                    {genero.label}
                  </option>
                ))}
              </select>
              {errors.genero && <span className="error-message">{errors.genero}</span>}
            </div>

            {/* Dificultad */}
            <div className="form-group">
              <label htmlFor="dificultad" className="form-label">
                ⚡ Dificultad
              </label>
              <select
                id="dificultad"
                name="dificultad"
                value={gameData.dificultad}
                onChange={handleInputChange}
                className={`form-select ${errors.dificultad ? 'error' : ''}`}
              >
                {dificultades.map(dificultad => (
                  <option key={dificultad.value} value={dificultad.value}>
                    {dificultad.label}
                  </option>
                ))}
              </select>
              {errors.dificultad && <span className="error-message">{errors.dificultad}</span>}
            </div>

            {/* Plataforma */}
            <div className="form-group">
              <label htmlFor="plataforma" className="form-label">
                🕹️ Plataforma
              </label>
              <select
                id="plataforma"
                name="plataforma"
                value={gameData.plataforma}
                onChange={handleInputChange}
                className={`form-select ${errors.plataforma ? 'error' : ''}`}
              >
                {plataformas.map(plataforma => (
                  <option key={plataforma.value} value={plataforma.value}>
                    {plataforma.label}
                  </option>
                ))}
              </select>
              {errors.plataforma && <span className="error-message">{errors.plataforma}</span>}
            </div>

            {/* Año de Lanzamiento */}
            <div className="form-group">
              <label htmlFor="lanzamiento" className="form-label">
                📅 Año de Lanzamiento
              </label>
              <input
                type="number"
                id="lanzamiento"
                name="lanzamiento"
                value={gameData.lanzamiento}
                onChange={handleInputChange}
                className={`form-input ${errors.lanzamiento ? 'error' : ''}`}
                placeholder="2024"
                min="1970"
                max={new Date().getFullYear()}
              />
              {errors.lanzamiento && <span className="error-message">{errors.lanzamiento}</span>}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
              disabled={isLoading}
            >
              <span className="btn-icon">🔄</span>
              Limpiar Formulario
            </button>
            
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="btn-icon loading">⏳</span>
                  {isEditMode ? 'Actualizando...' : 'Guardando...'}
                </>
              ) : (
                <>
                  <span className="btn-icon">{isEditMode ? '✅' : '💾'}</span>
                  {isEditMode ? 'Actualizar Juego' : 'Guardar Juego'}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preview Card */}
        <div className="preview-section">
          <h3 className="preview-title">👀 Vista Previa</h3>
          <div className="preview-card">
            <div className="preview-header">
              <h4 className="preview-game-title">
                {gameData.juego || 'Nombre del juego'}
              </h4>
            </div>
            <div className="preview-details">
              <div className="preview-item">
                <span className="preview-label">Género:</span>
                <span className="preview-value">{gameData.genero || 'No especificado'}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Dificultad:</span>
                <span className="preview-value">
                  {gameData.dificultad === 'fa' ? '🟢 Fácil' : 
                   gameData.dificultad === 'me' ? '🟡 Medio' : 
                   gameData.dificultad === 'di' ? '🔴 Difícil' : 'No especificado'}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Plataforma:</span>
                <span className="preview-value">{gameData.plataforma || 'No especificado'}</span>
              </div>
              <div className="preview-item">
                <span className="preview-label">Año:</span>
                <span className="preview-value">{gameData.lanzamiento || 'No especificado'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;