import React, { useState } from 'react';
import FormularioInicioSesion from './FormularioInicioSesion';
import FormularioRegistro from './FormularioRegistro';
import BusquedaCanchas from './BusquedaCanchas';
import BusquedaComplejos from './busqueda-complejos ';
import fondoInicio from '../assets/FondoInicio.jpg';

const PaginaInicio = () => {
  const [mostrarInicioSesion, setMostrarInicioSesion] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    },
    backgroundContainer: {
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
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contentContainer: {
      zIndex: 10,
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '4rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '0.5rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    subtitle: {
      fontSize: '1.5rem',
      color: '#4ade80',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
    formContainer: {
      width: '400px',
      zIndex: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      padding: '2rem',
      transition: 'all 0.3s ease',
    },
    heading: {
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#15803d',
      marginBottom: '1.5rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: '#16a34a',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    registerText: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontSize: '1rem',
    },
    registerLink: {
      color: '#16a34a',
      fontWeight: 'bold',
      textDecoration: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
    footer: {
      zIndex: 10,
      marginTop: '2rem',
      color: 'white',
      fontSize: '0.875rem',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
  };

  const renderContenido = () => {
    if (!usuarioAutenticado) {
      if (mostrarInicioSesion) {
        return <FormularioInicioSesion onVolver={() => setMostrarInicioSesion(false)} onLogin={() => setUsuarioAutenticado(true)} />;
      }
      if (mostrarRegistro) {
        return <FormularioRegistro onVolver={() => setMostrarRegistro(false)} />;
      }
      return (
        <div>
          <h2 style={styles.heading}>⚽ Reserva tu cancha</h2>
          <button onClick={() => setMostrarInicioSesion(true)} style={styles.button}>
            Iniciar Sesión
          </button>
          <p style={styles.registerText}>
            ¿Nuevo en el equipo?{' '}
            <button onClick={() => setMostrarRegistro(true)} style={styles.registerLink}>
              Regístrate aquí
            </button>
          </p>
        </div>
      );
    }

    if (!opcionSeleccionada) {
      return (
        <div>
          <h2 style={styles.heading}>Selecciona una opción</h2>
          <button 
            onClick={() => setOpcionSeleccionada('canchas')}
            style={{...styles.button, marginBottom: '1rem'}}
          >
            Búsqueda de Canchas
          </button>
          <button 
            onClick={() => setOpcionSeleccionada('complejos')}
            style={styles.button}
          >
            Búsqueda de Complejos
          </button>
        </div>
      );
    }

    return opcionSeleccionada === 'canchas' ? <BusquedaCanchas /> : <BusquedaComplejos />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundContainer}>
        <div style={styles.overlay} />
        
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>FutBooking</h1>
          <p style={styles.subtitle}>Tu cancha, tu partido, tu momento</p>
        </div>
        
        <div style={styles.formContainer}>
          {renderContenido()}
        </div>

        <footer style={styles.footer}>
          © 2024 FutBooking - Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
};

export default PaginaInicio;