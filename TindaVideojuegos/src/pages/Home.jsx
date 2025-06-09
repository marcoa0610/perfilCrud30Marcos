import { useState } from "react";
import { Link } from "react-router-dom";
import Titulo from "../components/Titulo";
import GameTable from "../components/GameTable";
import EditGameModal from "../components/EditGameModal";
import useFetchGames from "../hooks/users/UseFetchGame";
import useGameActions from "../hooks/users/UseGameAction";
import "../css/Home.css";

const Home = () => {
  const { games, getGames } = useFetchGames();
  const { deleteGame, handleUpdateGame, loading } = useGameActions(getGames);
  
  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const dificultadLabels = {
    'fa': 'Fácil',
    'me': 'Medio',
    'di': 'Difícil'
  };

  const mapDificultadToKey = (value) => {
  const mapping = {
    'Fácil': 'fa',
    'Media': 'me',
    'Medio': 'me',
    'Difícil': 'di',
    'Enterprise Plan': 'di', // ajuste temporal
  };
  return mapping[value] || ''; // valor por defecto si no se reconoce
};

const mapPlataforma = (value) => {
  const plataformas = ['PC', 'Play Station', 'Xbox', 'Nintendo Switch', 'Mobile'];
  return plataformas.includes(value) ? value : 'PC'; // o '' si prefieres forzar elección
};

const validarLanzamiento = (valor) => {
  const año = parseInt(valor);
  return año >= 1970 && año <= new Date().getFullYear() ? año : '';
};

const handleSaaveGame = async (updatedGame) => {
  if (!updatedGame?.id) {
    console.error("❌ El juego no tiene un ID válido para actualizar:", updatedGame);
    alert("No se puede actualizar el juego porque falta el ID.");
    return;
  }

  try {
    await handleUpdateGame(updatedGame);
    handleCloseModal();
  } catch (error) {
    console.error("Error al actualizar el juego:", error);
  }
};



  // Función para abrir el modal de edición
const handleEditGame = (game) => {
  console.log("Juego recibido para editar:", game); // Para debug
  
  const transformedGame = {
    id: game.id,
    nombre: game.juego || '', // Mapear juego → nombre
    genero: game.genero || '',
    dificultad: game.dificultad || '', // No necesitas mapear aquí, el modal lo hará
    plataforma: game.plataforma || '',
    lanzamiento: game.lanzamiento || ''
  };

  console.log("Juego transformado:", transformedGame); // Para debug
  setSelectedGame(transformedGame);
  setIsModalOpen(true);
};




  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  // Función para manejar el guardado del juego editado
 const handleSaveGame = async (updatedGame) => {
  try {
    // Transformar para que coincida con la API
    const gameToSend = {
      id: updatedGame.id,
      juego: updatedGame.nombre, // nombre → juego
      genero: updatedGame.genero,
      dificultad: updatedGame.dificultad,
      plataforma: updatedGame.plataforma,
      lanzamiento: parseInt(updatedGame.lanzamiento)
    };

    console.log("Datos a enviar a la API:", gameToSend); // Para debug
    await handleUpdateGame(gameToSend);
    handleCloseModal();
  } catch (error) {
    console.error('Error al actualizar el juego:', error);
    alert('Error al actualizar el juego. Verifica la consola para más detalles.');
  }
};

  // Ejemplo de datos del juego que quieres editar
  const exampleGame = {
    id: 1,
    nombre: "Striker",
    genero: "Lucha",
    dificultad: "me", // 'me' para Medio según tu dificultadLabels
    plataforma: "Play Station",
    lanzamiento: 2019
  };

 

  return (
    <div className="home-container">
      {/* Header Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Carlos' Library</h1>
          <p className="hero-subtitle">Mi biblioteca personal de videojuegos</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{games?.length || 0}</span>
              <span className="stat-label">Juegos</span>
            </div>
           
         
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-icon">🎯</div>
          <div className="floating-icon">🕹️</div>
          <div className="floating-icon">💻</div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="nav-section">
        <Link to="/games" className="add-game-btn">
          <span className="btn-icon">➕</span>
          Agregar Nuevo Juego
        </Link>
        
       
       
      </div>

      {/* Main Content */}
      <div className="main-content">
        

        {/* Games Table */}
        <GameTable 
          games={games}
          onEdit={handleEditGame} // Aquí es donde conectas la función de edición
          onDelete={deleteGame}
          dificultadLabels={dificultadLabels}
        />
      </div>

      {/* Modal de Edición */}
      <EditGameModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        game={selectedGame}
        onSave={handleSaveGame}
        dificultadLabels={dificultadLabels}
        loading={loading}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Carlos' Library</h4>
            <p>Mi biblioteca personal de videojuegos</p>
            
          </div>
         
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Carlos Library. Creado por Marcos López Como practica.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;