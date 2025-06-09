import React, { useState, useEffect } from 'react';
import '../css/EditGameModal.css';

const EditGameModal = ({ 
  isOpen, 
  onClose, 
  game, 
  onSave, 
  dificultadLabels = {
    'fa': 'Fácil',
    'me': 'Media', 
    'di': 'Difícil'
  },
  loading = false
}) => {
  // Solo los 5 campos que quieres mostrar
  const [formData, setFormData] = useState({
    nombre: '',
    genero: '',
    plataforma: '',
    dificultad: '',
    lanzamiento: ''
  });

  const [errors, setErrors] = useState({});

  // Inicializar el formulario con los datos del juego cuando se abre el modal
  useEffect(() => {
  if (isOpen) {
    console.log('Datos recibidos en el modal:', game);
    if (game) {
      setFormData({
        nombre: game.nombre || game.juego || '', // Acepta ambos campos
        genero: game.genero || '',
        plataforma: game.plataforma || '',
        dificultad: game.dificultad || '',
        lanzamiento: game.lanzamiento || ''
      });
    } else {
      console.error('No se recibió el juego para editar');
    }
    setErrors({});
  }
}, [game, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.genero.trim()) {
      newErrors.genero = 'El género es requerido';
    }
    
    if (!formData.plataforma.trim()) {
      newErrors.plataforma = 'La plataforma es requerida';
    }
    
    if (!formData.dificultad) {
      newErrors.dificultad = 'La dificultad es requerida';
    }

    if (!formData.lanzamiento) {
      newErrors.lanzamiento = 'El año de lanzamiento es requerido';
    } else if (formData.lanzamiento < 1970 || formData.lanzamiento > new Date().getFullYear()) {
      newErrors.lanzamiento = 'Ingresa un año válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const updatedGame = {
    id: game.id, // aseguramos que se mantenga el ID
    nombre: formData.nombre,
    genero: formData.genero,
    dificultad: formData.dificultad,
    plataforma: formData.plataforma,
    lanzamiento: parseInt(formData.lanzamiento)
  };

  console.log('Enviando datos actualizados al padre:', updatedGame);
  onSave(updatedGame);
};


  const handleClose = () => {
    setFormData({
      nombre: '',
      genero: '',
      plataforma: '',
      dificultad: '',
      lanzamiento: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="modal-icon">✏️</span>
            Editar Videojuego
          </h2>
          <button 
            className="modal-close-btn"
            onClick={handleClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Nombre del Juego */}
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                🎮 Nombre del Juego *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className={`form-input ${errors.nombre ? 'error' : ''}`}
                placeholder="Ej: Striker"
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            {/* Género */}
            <div className="form-group">
              <label htmlFor="genero" className="form-label">
                🎯 Género *
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                className={`form-select ${errors.genero ? 'error' : ''}`}
              >
                <option value="">Seleccionar género</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Lucha">Lucha</option>
                <option value="Deportes">Deportes</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Simulación">Simulación</option>
              </select>
              {errors.genero && <span className="error-message">{errors.genero}</span>}
            </div>

            {/* Plataforma */}
            <div className="form-group">
              <label htmlFor="plataforma" className="form-label">
                🕹️ Plataforma *
              </label>
              <select
                id="plataforma"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleInputChange}
                className={`form-select ${errors.plataforma ? 'error' : ''}`}
              >
                <option value="">Seleccionar plataforma</option>
                <option value="Play Station">Play Station</option>
                <option value="Xbox">Xbox</option>
                <option value="PC">PC</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Mobile">Mobile</option>
              </select>
              {errors.plataforma && <span className="error-message">{errors.plataforma}</span>}
            </div>

            {/* Dificultad */}
            <div className="form-group">
              <label htmlFor="dificultad" className="form-label">
                ⚡ Dificultad *
              </label>
              <select
                id="dificultad"
                name="dificultad"
                value={formData.dificultad}
                onChange={handleInputChange}
                className={`form-select ${errors.dificultad ? 'error' : ''}`}
              >
                <option value="">Seleccionar dificultad</option>
                {Object.entries(dificultadLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              {errors.dificultad && <span className="error-message">{errors.dificultad}</span>}
            </div>

            {/* Año de Lanzamiento */}
            <div className="form-group">
              <label htmlFor="lanzamiento" className="form-label">
                📅 Año de Lanzamiento *
              </label>
              <input
                type="number"
                id="lanzamiento"
                name="lanzamiento"
                value={formData.lanzamiento}
                onChange={handleInputChange}
                className={`form-input ${errors.lanzamiento ? 'error' : ''}`}
                placeholder="Ej: 2019"
                min="1970"
                max={new Date().getFullYear()}
              />
              {errors.lanzamiento && <span className="error-message">{errors.lanzamiento}</span>}
            </div>
          </div>

          {/* Vista previa de los datos */}
          <div className="preview-section">
            <h3>Vista Previa de los Datos:</h3>
            <div className="preview-data">
              <p><strong>Juego:</strong> {formData.nombre || 'Sin especificar'}</p>
              <p><strong>Género:</strong> {formData.genero || 'Sin especificar'}</p>
              <p><strong>Dificultad:</strong> {formData.dificultad ? dificultadLabels[formData.dificultad] : 'Sin especificar'}</p>
              <p><strong>Plataforma:</strong> {formData.plataforma || 'Sin especificar'}</p>
              <p><strong>Lanzamiento:</strong> {formData.lanzamiento || 'Sin especificar'}</p>
            </div>
          </div>

          {/* Botones */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleClose}
              className="btn-cancel"
              disabled={loading}
            >
              ❌ Cancelar
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Guardando...
                </>
              ) : (
                <>
                  💾 Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGameModal;