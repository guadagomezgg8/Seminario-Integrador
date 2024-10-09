import React, { useState, useEffect } from 'react';

export default function GestionTurnos() {
  const [complejos, setComplejos] = useState([]);
  const [complejoSeleccionado, setComplejoSeleccionado] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    // Simular carga de datos de complejos
    setComplejos([
      { id: 1, nombre: 'Complejo A' },
      { id: 2, nombre: 'Complejo B' },
    ]);
  }, []);

  const cargarCanchas = (complejoId) => {
    const canchasSimuladas = [
      { id: 1, nombre: 'Cancha 1', complejoId: 1 },
      { id: 2, nombre: 'Cancha 2', complejoId: 1 },
      { id: 3, nombre: 'Cancha 3', complejoId: 2 },
    ].filter(cancha => cancha.complejoId === complejoId);
    setCanchas(canchasSimuladas);
    setCanchaSeleccionada(null);
  };

  const cargarTurnos = () => {
    const turnosSimulados = [
      { id: 1, hora: '09:00', ocupado: false },
      { id: 2, hora: '10:00', ocupado: true },
      { id: 3, hora: '11:00', ocupado: false },
      { id: 4, hora: '12:00', ocupado: false },
    ];
    setTurnos(turnosSimulados);
  };

  const handleComplejoChange = (e) => {
    const complejoId = parseInt(e.target.value);
    setComplejoSeleccionado(complejoId);
    cargarCanchas(complejoId);
  };

  const handleCanchaChange = (e) => {
    setCanchaSeleccionada(parseInt(e.target.value));
  };

  const handleFechaChange = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  const handleBuscarTurnos = () => {
    if (complejoSeleccionado && canchaSeleccionada && fechaSeleccionada) {
      cargarTurnos();
    } else {
      alert('Por favor, seleccione complejo, cancha y fecha.');
    }
  };

  const toggleOcuparTurno = (turnoId) => {
    setTurnos(turnos.map(turno =>
      turno.id === turnoId ? { ...turno, ocupado: !turno.ocupado } : turno
    ));
  };

  const estilos = {
    contenedor: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    titulo: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '1px',
    },
    formulario: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '20px',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      transition: 'border 0.3s ease',
      ':focus': {
        border: '1px solid #4CAF50',
      }
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      transition: 'border 0.3s ease',
      ':focus': {
        border: '1px solid #4CAF50',
      }
    },
    boton: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      ':hover': {
        backgroundColor: '#45a049',
      }
    },
    listaTurnos: {
      listStyle: 'none',
      padding: 0,
      marginTop: '20px',
    },
    turno: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
    },
    turnoOcupado: {
      backgroundColor: '#ffcccb',
    },
    turnoLibre: {
      backgroundColor: '#90EE90',
    },
  };

  return (
    <div style={estilos.contenedor}>
      <h1 style={estilos.titulo}>Gestión de Turnos</h1>
      <div style={estilos.formulario}>
        <select 
          value={complejoSeleccionado || ''} 
          onChange={handleComplejoChange}
          style={estilos.select}
        >
          <option value="">Seleccione un complejo</option>
          {complejos.map(complejo => (
            <option key={complejo.id} value={complejo.id}>{complejo.nombre}</option>
          ))}
        </select>

        <select 
          value={canchaSeleccionada || ''} 
          onChange={handleCanchaChange}
          style={estilos.select}
          disabled={!complejoSeleccionado}
        >
          <option value="">Seleccione una cancha</option>
          {canchas.map(cancha => (
            <option key={cancha.id} value={cancha.id}>{cancha.nombre}</option>
          ))}
        </select>

        <input 
          type="date" 
          value={fechaSeleccionada} 
          onChange={handleFechaChange}
          style={estilos.input}
        />

        <button onClick={handleBuscarTurnos} style={estilos.boton}>
          Buscar Turnos
        </button>
      </div>

      {turnos.length > 0 && (
        <div>
          <h2>Turnos Disponibles</h2>
          <ul style={estilos.listaTurnos}>
            {turnos.map(turno => (
              <li 
                key={turno.id} 
                style={{
                  ...estilos.turno,
                  ...(turno.ocupado ? estilos.turnoOcupado : estilos.turnoLibre)
                }}
              >
                <span>{turno.hora}</span>
                <button 
                  onClick={() => toggleOcuparTurno(turno.id)}
                  style={{
                    ...estilos.boton,
                    backgroundColor: turno.ocupado ? '#f44336' : '#4CAF50'
                  }}
                >
                  {turno.ocupado ? 'Desocupar' : 'Ocupar'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
