import { useState } from 'react';

const useDataGame = () => {
  const [gameData, setGameData] = useState({
    juego: '',
    genero: '',
    dificultad: '',
    plataforma: '',
    lanzamiento: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!gameData.juego.trim()) {
      newErrors.juego = 'El nombre del juego es requerido';
    }

    if (!gameData.genero) {
      newErrors.genero = 'El género es requerido';
    }

    if (!gameData.dificultad) {
      newErrors.dificultad = 'La dificultad es requerida';
    }

    if (!gameData.plataforma) {
      newErrors.plataforma = 'La plataforma es requerida';
    }

    if (!gameData.lanzamiento) {
      newErrors.lanzamiento = 'El año de lanzamiento es requerido';
    } else if (gameData.lanzamiento < 1970 || gameData.lanzamiento > new Date().getFullYear()) {
      newErrors.lanzamiento = 'Ingresa un año válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setGameData({
      juego: '',
      genero: '',
      dificultad: '',
      plataforma: '',
      lanzamiento: ''
    });
    setErrors({});
  };

  const setInitialData = (data) => {
    setGameData(data);
    setErrors({});
  };

  return {
    gameData,
    errors,
    handleInputChange,
    validateForm,
    resetForm,
    setInitialData
  };
};

export default useDataGame;