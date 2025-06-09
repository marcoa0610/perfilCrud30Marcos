// hooks/games/useFetchGames.js
import { useState, useEffect } from 'react';
import { url } from '../../utils/apiUrl';

const useFetchGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching games:', err);

      // Datos de prueba para desarrollo
      setGames([
        {
          id: 1,
          juego: "Starlit Adventures",
          genero: "Aventura",
          dificultad: "fa",
          plataforma: "PlayStation",
          lanzamiento: 2015
        },
        {
          id: 2,
          juego: "Forest Quest",
          genero: "RPG",
          dificultad: "me",
          plataforma: "Xbox",
          lanzamiento: 2018
        },
        {
          id: 3,
          juego: "Urban Legends",
          genero: "Acción",
          dificultad: "di",
          plataforma: "PC",
          lanzamiento: 2020
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (gameData) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });

    if (!response.ok) {
      throw new Error('Error al agregar el juego');
    }

    await getGames(); // Refresca lista
  };

  const updateGame = async (id, gameData) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el juego');
    }

    await getGames(); // Refresca lista
  };

  useEffect(() => {
    getGames();
  }, []);

  return {
    games,
    loading,
    error,
    getGames,
    refetch: getGames,
    addGame,
    updateGame
  };
};

export default useFetchGames;
