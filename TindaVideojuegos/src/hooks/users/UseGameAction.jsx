// hooks/games/useGameActions.js
import { useState } from 'react';
import { url } from '../../utils/apiUrl';

const useGameActions = (refreshGames) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteGame = async (gameId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log(`Eliminando: ${url}/${gameId}`);

      const response = await fetch(`${url}/${gameId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.status}`);
      }

      alert('¡Juego eliminado exitosamente!');
      if (refreshGames) {
        refreshGames();
      }
    } catch (err) {
      setError(err.message);
      console.error('Error deleting game:', err);
      alert('Error al eliminar el juego. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Función actualizada para manejar la edición con modal
  const handleUpdateGame = async (gameData) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Actualizando juego:', gameData);

      const response = await fetch(`${url}/${gameData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status}`);
      }

      const updatedGame = await response.json();
      
      alert('¡Juego actualizado exitosamente!');
      
      if (refreshGames) {
        refreshGames();
      }
      
      return updatedGame;
    } catch (err) {
      setError(err.message);
      console.error('Error updating game:', err);
      alert('Error al actualizar el juego. Por favor, intenta de nuevo.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createGame = async (gameData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error(`Error al crear: ${response.status}`);
      }

      const newGame = await response.json();
      
      alert('¡Juego creado exitosamente!');
      
      if (refreshGames) {
        refreshGames();
      }
      
      return newGame;
    } catch (err) {
      setError(err.message);
      console.error('Error creating game:', err);
      alert('Error al crear el juego. Por favor, intenta de nuevo.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función separada para actualizar (mantenida para compatibilidad)
  const updateGame = async (gameId, gameData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${url}/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar: ${response.status}`);
      }

      const updatedGame = await response.json();
      
      alert('¡Juego actualizado exitosamente!');
      
      if (refreshGames) {
        refreshGames();
      }
      
      return updatedGame;
    } catch (err) {
      setError(err.message);
      console.error('Error updating game:', err);
      alert('Error al actualizar el juego. Por favor, intenta de nuevo.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteGame,
    handleUpdateGame,
    createGame,
    updateGame,
    loading,
    error
  };
};

export default useGameActions;