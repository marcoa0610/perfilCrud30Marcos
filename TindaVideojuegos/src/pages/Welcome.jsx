import React from 'react';
import { useNavigate } from 'react-router-dom';

// Componente para el logo
const Logo = () => {
  return (
    <div className="mb-8">
      <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span className="text-3xl">🎮</span>
      </div>
    </div>
  );
};

// Componente para el título
const Title = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-white mb-4">
        Carlos' Library
      </h1>
      <p className="text-gray-300 text-lg mb-8">
      Bienvenido a la librearia, Carlos
      </p>
    </>
  );
};

// Componente para el botón
const ContinueButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      Continuar
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </button>
  );
};

// Componente contenedor principal
const WelcomeContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {children}
      </div>
    </div>
  );
};

// Componente principal Welcome
const Welcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <WelcomeContainer>
      <Logo />
      <Title />
      <ContinueButton onClick={handleContinue} />
    </WelcomeContainer>
  );
};

export default Welcome;