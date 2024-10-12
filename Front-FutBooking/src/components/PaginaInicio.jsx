import React, { useState } from 'react';
import FormularioInicioSesion from './FormularioInicioSesion';
import FormularioRegistro from './FormularioRegistro';
import BusquedaCanchas from './BusquedaCanchas';
import fondoInicio from '../assets/FondoInicio.jpg';

const PaginaInicio = () => {
  const [mostrarInicioSesion, setMostrarInicioSesion] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${fondoInicio})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}
      >
        {/* Filtro para mejorar la legibilidad del texto */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajusta la opacidad según sea necesario
        }} />
        
        <div style={{ zIndex: 10, textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '0.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            FutBooking
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            color: '#4ade80',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}>
            Tu cancha, tu partido, tu momento
          </p>
        </div>
        
        <div style={{
          width: '400px',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          padding: '2rem',
          transition: 'all 0.3s ease',
        }}>
          {usuarioAutenticado ? (
            <BusquedaCanchas />
          ) : !mostrarInicioSesion && !mostrarRegistro ? (
            <div>
              <h2 style={{ 
                textAlign: 'center', 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: '#15803d', 
                marginBottom: '1.5rem',
              }}>
                ⚽ Reserva tu cancha
              </h2>
              <button 
                onClick={() => setMostrarInicioSesion(true)}
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
                Iniciar Sesión
              </button>
              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '1rem' }}>
                ¿Nuevo en el equipo?{' '}
                <button 
                  onClick={() => setMostrarRegistro(true)}
                  style={{ 
                    color: '#16a34a', 
                    fontWeight: 'bold', 
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                  }}
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          ) : mostrarInicioSesion ? (
            <FormularioInicioSesion onVolver={() => setMostrarInicioSesion(false)} onLogin={() => setUsuarioAutenticado(true)} />
          ) : (
            <FormularioRegistro onVolver={() => setMostrarRegistro(false)} />
          )}
        </div>

        <footer style={{ 
          zIndex: 10, 
          marginTop: '2rem', 
          color: 'white', 
          fontSize: '0.875rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}>
          © 2023 FutBooking - Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
};

export default PaginaInicio;
