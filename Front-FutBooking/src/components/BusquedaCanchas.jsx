import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import LayoutSinNavbar from './LayoutSinNavbar';

const BusquedaCanchas = () => {
  const [localidad, setLocalidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [tipoCancha, setTipoCancha] = useState('');

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pasar los datos a través de la URL al hacer la búsqueda
    navigate(`/resultado-canchas?localidad=${localidad}&fecha=${fecha}&hora=${hora}&tipoCancha=${tipoCancha}`);
  };

  const selectStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    marginBottom: '1rem',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em 1.5em',
  };

  return (
    <LayoutSinNavbar>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#15803d', 
          marginBottom: '1.5rem',
        }}>
          Busca tu cancha ideal
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Selecciona una localidad</option>
            <option value="localidad1">Localidad 1</option>
            <option value="localidad2">Localidad 2</option>
            <option value="localidad3">Localidad 3</option>
          </select>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            style={{
              ...selectStyle,
              backgroundImage: 'none',
            }}
          />
          <select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Selecciona una hora</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
          </select>
          <select
            value={tipoCancha}
            onChange={(e) => setTipoCancha(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Selecciona un tipo de cancha</option>
            <option value="futbol5">Fútbol 5</option>
            <option value="futbol7">Fútbol 7</option>
            <option value="futbol11">Fútbol 11</option>
          </select>
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Buscar Canchas
          </button>
        </form>
      </div>
    </LayoutSinNavbar>
  );
};

export default BusquedaCanchas;
