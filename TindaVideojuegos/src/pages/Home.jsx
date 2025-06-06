import { Link } from "react-router-dom";
import Titulo from "../components/Titulos";
import Button from "../components/Button";
import GameCard from "../components/GameCard";
import StatsCard from "../components/StatsCard";
import EmptyState from "../components/EmptyState";
import useFetchGames from "../hooks/games/useFetchGames";
import useGameActions from "../hooks/games/useGameActions";
import "../css/Home.css";

const Home = () => {
  const { games, getGames } = useFetchGames();
  const { deleteGame, handleUpdateGame } = useGameActions(getGames);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🎮 Game Zone</h1>
          <p className="hero-subtitle">Tu biblioteca personal de videojuegos</p>
          <Link to="/games/add" className="hero-button">
            ➕ Agregar Nuevo Juego
          </Link>
        </div>
        
        <div className="stats-container">
          <StatsCard 
            number={games?.length || 0}
            label="Juegos Total"
            icon="🎮"
          />
          <StatsCard 
            number={new Set(games?.map(game => game.genero)).size || 0}
            label="Géneros"
            icon="🏷️"
          />
          <StatsCard 
            number={new Set(games?.map(game => game.plataforma)).size || 0}
            label="Plataformas"
            icon="📱"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <Titulo titulo="🎯 Mi Biblioteca de Juegos" />
        
        <p className="section-description">
          Gestiona y organiza tu colección de videojuegos favoritos
        </p>

        {games?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="games-grid">
            {games?.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={() => handleUpdateGame(game.id)}
                onDelete={() => deleteGame(game.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;