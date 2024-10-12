import React, { useState } from 'react';
import canchapelota from '../assets/canchapelota.jpg';

const ResultadosBusqueda = () => {
  const [turnosSeleccionados, setTurnosSeleccionados] = useState({});

  const canchas = [
    {
      id: 1,
      nombre: 'Cancha El Gol',
      direccion: 'Calle 123, Ciudad',
      telefono: '123-456-7890',
      foto: canchapelota, 
      descripcion: 'Cancha de fútbol 5 con césped sintético',
      precio: 50,
      turnos: ['19:00', '20:00', '21:00']
    },
    {
      id: 2,
      nombre: 'Cancha La Pelota',
      direccion: 'Avenida 456, Ciudad',
      telefono: '098-765-4321',
      foto: '/placeholder.svg?height=200&width=300',
      descripcion: 'Cancha de fútbol 7 con iluminación nocturna',
      precio: 75,
      turnos: ['18:00', '19:00', '20:00', '21:00']
    }
  ];

  const handleTurnoClick = (canchaId, turno) => {
    setTurnosSeleccionados(prev => ({
      ...prev,
      [canchaId]: turno
    }));
  };

  const handleReservar = (canchaId) => {
    const turnoSeleccionado = turnosSeleccionados[canchaId];
    if (turnoSeleccionado) {
      alert(`Reservando cancha ${canchaId} para el turno ${turnoSeleccionado}`);
    } else {
      alert('Por favor, selecciona un turno antes de reservar.');
    }
  };

  return (
    <div style={{
      maxWidth: '1152px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#15803d',
        marginBottom: '2rem'
      }}>
        Resultados de búsqueda
      </h2>
      {canchas.map(cancha => (
        <div key={cancha.id} style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
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
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>{cancha.nombre}</h3>
              <p><strong>Dirección:</strong> {cancha.direccion}</p>
              <p><strong>Teléfono:</strong> {cancha.telefono}</p>
              <p><strong>Descripción:</strong> {cancha.descripcion}</p>
              <p><strong>Precio:</strong> ${cancha.precio}</p>
              <div style={{ marginTop: '1rem' }}>
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
                        backgroundColor: turnosSeleccionados[cancha.id] === turno ? '#16a34a' : '#e5e7eb',
                        color: turnosSeleccionados[cancha.id] === turno ? 'white' : 'black',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      aria-pressed={turnosSeleccionados[cancha.id] === turno}
                    >
                      {turno}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
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
                cursor: 'pointer'
              }}
              aria-label={`Reservar cancha ${cancha.nombre}`}
            >
              Reservar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultadosBusqueda;
