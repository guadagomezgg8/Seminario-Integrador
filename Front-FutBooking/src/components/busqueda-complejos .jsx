import React, { useState, useEffect, useRef } from 'react';

const BusquedaComplejos = () => {
  const [busqueda, setBusqueda] = useState('');
  const [tipoBusqueda, setTipoBusqueda] = useState('nombre');
  const [, setComplejos] = useState([]);
  const [complejoSeleccionado, setComplejoSeleccionado] = useState(null);
  const [reservas, setReservas] = useState({});
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const sugerenciasRef = useRef(null);

  // Datos de ejemplo (en una aplicación real, estos datos vendrían de una API)
  const complejosEjemplo = [
    {
      id: 1,
      nombre: 'Complejo Deportivo A',
      descripcion: 'Complejo con múltiples canchas de fútbol',
      direccion: 'Calle 123, Ciudad A',
      foto: '/placeholder.svg?height=200&width=300',
      ubicacion: 'Ciudad A',
      canchas: [
        {
          id: 1,
          nombre: 'Cancha 1',
          descripcion: 'Cancha de fútbol 5',
          precio: 50,
          foto: '/placeholder.svg?height=150&width=200',
          turnos: ['18:00', '19:00', '20:00']
        },
        {
          id: 2,
          nombre: 'Cancha 2',
          descripcion: 'Cancha de fútbol 7',
          precio: 75,
          foto: '/placeholder.svg?height=150&width=200',
          turnos: ['18:00', '19:00', '20:00', '21:00']
        }
      ]
    },
    {
      id: 2,
      nombre: 'Complejo Deportivo B',
      descripcion: 'Complejo con canchas de fútbol y tenis',
      direccion: 'Avenida 456, Ciudad B',
      foto: '/placeholder.svg?height=200&width=300',
      ubicacion: 'Ciudad B',
      canchas: [
        {
          id: 3,
          nombre: 'Cancha 3',
          descripcion: 'Cancha de fútbol 11',
          precio: 100,
          foto: '/placeholder.svg?height=150&width=200',
          turnos: ['17:00', '19:00', '21:00']
        }
      ]
    }
  ];

  useEffect(() => {
    // Simular carga inicial de datos
    setComplejos(complejosEjemplo);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sugerenciasRef.current && !sugerenciasRef.current.contains(event.target)) {
        setMostrarSugerencias(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const buscarComplejos = (query) => {
    setBusqueda(query);
    if (query.length > 0) {
      const sugerenciasFiltradas = complejosEjemplo.filter(complejo => {
        if (tipoBusqueda === 'nombre') {
          return complejo.nombre.toLowerCase().includes(query.toLowerCase());
        } else {
          return complejo.ubicacion.toLowerCase().includes(query.toLowerCase());
        }
      });
      setSugerencias(sugerenciasFiltradas);
      setMostrarSugerencias(true);
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  };

  const seleccionarComplejo = (complejo) => {
    setComplejoSeleccionado(complejo);
    setBusqueda(tipoBusqueda === 'nombre' ? complejo.nombre : complejo.ubicacion);
    setMostrarSugerencias(false);
  };

  const handleFechaChange = (canchaId, fecha) => {
    setReservas(prev => ({
      ...prev,
      [canchaId]: { ...prev[canchaId], fecha }
    }));
  };

  const handleTurnoClick = (canchaId, turno) => {
    setReservas(prev => ({
      ...prev,
      [canchaId]: { ...prev[canchaId], turno }
    }));
  };

  const handleReservar = (canchaId) => {
    const reserva = reservas[canchaId];
    if (reserva && reserva.fecha && reserva.turno) {
      alert(`Reservando cancha ${canchaId} para el día ${reserva.fecha} en el turno ${reserva.turno}`);
    } else {
      alert('Por favor, selecciona una fecha y un turno antes de reservar.');
    }
  };

  const styles = {
    container: {
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '2rem'
    },
    title: {
      textAlign: 'center',
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#15803d',
      marginBottom: '2rem'
    },
    form: {
      marginBottom: '2rem',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      marginBottom: '1rem'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      marginBottom: '1rem',
      backgroundColor: 'white'
    },
    sugerencias: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 10
    },
    sugerenciaItem: {
      padding: '0.5rem',
      cursor: 'pointer',
      hover: {
        backgroundColor: '#f3f4f6'
      }
    },
    complejoItem: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      cursor: 'pointer'
    },
    complejoContent: {
      display: 'flex',
      flexDirection: 'row',
      gap: '1.5rem'
    },
    complejoImage: {
      flex: '0 0 33.333333%'
    },
    complejoInfo: {
      flex: '0 0 66.666667%'
    },
    complejoTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '0.375rem',
      objectFit: 'cover'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#15803d',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Búsqueda de Complejos Deportivos</h1>

      <div style={styles.form}>
        <select
          value={tipoBusqueda}
          onChange={(e) => setTipoBusqueda(e.target.value)}
          style={styles.select}
        >
          <option value="nombre">Buscar por nombre</option>
          <option value="ubicacion">Buscar por ubicación</option>
        </select>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => buscarComplejos(e.target.value)}
          placeholder={tipoBusqueda === 'nombre' ? "Ingrese el nombre del complejo" : "Ingrese una ubicación"}
          style={styles.input}
        />
        {mostrarSugerencias && sugerencias.length > 0 && (
          <div style={styles.sugerencias} ref={sugerenciasRef}>
            {sugerencias.map(complejo => (
              <div
                key={complejo.id}
                style={styles.sugerenciaItem}
                onClick={() => seleccionarComplejo(complejo)}
              >
                {tipoBusqueda === 'nombre' ? complejo.nombre : complejo.ubicacion}
              </div>
            ))}
          </div>
        )}
      </div>

      {complejoSeleccionado && (
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Detalles del Complejo
          </h2>
          <div style={styles.complejoItem}>
            <div style={styles.complejoContent}>
              <div style={styles.complejoImage}>
                <img
                  src={complejoSeleccionado.foto}
                  alt={`Vista de ${complejoSeleccionado.nombre}`}
                  style={styles.image}
                />
              </div>
              <div style={styles.complejoInfo}>
                <h3 style={styles.complejoTitle}>{complejoSeleccionado.nombre}</h3>
                <p><strong>Descripción:</strong> {complejoSeleccionado.descripcion}</p>
                <p><strong>Dirección:</strong> {complejoSeleccionado.direccion}</p>
                <p><strong>Ubicación:</strong> {complejoSeleccionado.ubicacion}</p>
              </div>
            </div>
          </div>

          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            marginTop: '2rem'
          }}>
            Canchas de {complejoSeleccionado.nombre}
          </h2>
          {complejoSeleccionado.canchas.map(cancha => (
            <div
              key={cancha.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1.5rem'
              }}>
                <div style={{ flex: '0 0 33.333333%' }}>
                  <img
                    src={cancha.foto}
                    alt={`Vista de ${cancha.nombre}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '0.375rem',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div style={{ flex: '0 0 66.666667%' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>{cancha.nombre}</h3>
                  <p><strong>Descripción:</strong> {cancha.descripcion}</p>
                  <p><strong>Precio:</strong> ${cancha.precio}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <label htmlFor={`fecha-${cancha.id}`} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                      Selecciona una fecha:
                    </label>
                    <input
                      type="date"
                      id={`fecha-${cancha.id}`}
                      onChange={(e) => handleFechaChange(cancha.id, e.target.value)}
                      style={{
                        width: '80%',
                        padding: '0.5rem',
                        marginBottom: '1rem',
                        borderRadius: '0.25rem',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Turnos disponibles:</p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {cancha.turnos.map(turno => (
                        <button
                          key={turno}
                          onClick={() => handleTurnoClick(cancha.id, turno)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.25rem',
                            backgroundColor: reservas[cancha.id]?.turno === turno ? '#16a34a' : '#e5e7eb',
                            color: reservas[cancha.id]?.turno === turno ? 'white' : 'black',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {turno}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReservar(cancha.id)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#16a34a',
                      color: 'white',
                      borderRadius: '0.375rem',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                
                      marginTop: '1rem'
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setComplejoSeleccionado(null);
              setBusqueda('');
            }}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#4b5563',
              color: 'white',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Volver a la búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default BusquedaComplejos;