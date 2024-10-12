import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#15803d',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '1.75rem',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{ marginRight: '0.5rem' }}>⚽</span>
        FutBooking
      </div>
      <div>
        {/* Utilizamos Link para cada ruta */}
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/buscar-canchas" style={linkStyle}>Buscar Canchas</Link>
        <Link to="/mi-perfil" style={linkStyle}>Mi Perfil</Link>
      </div>
    </nav>
  );
};

// Estilo compartido para los enlaces
const linkStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
  marginLeft: '1.5rem',
  fontSize: '1rem',
  textDecoration: 'none',
  transition: 'opacity 0.3s ease',
  opacity: 0.8,
  padding: '0.5rem',
};

export default Navbar;
