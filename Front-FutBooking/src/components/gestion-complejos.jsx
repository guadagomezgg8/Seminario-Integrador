import React, { useState, useEffect } from 'react';

export default function GestionComplejosYCanchas() {
  const [complejos, setComplejos] = useState([]);
  const [complejoSeleccionado, setComplejoSeleccionado] = useState(null);
  const [nombreComplejo, setNombreComplejo] = useState('');
  const [descripcionComplejo, setDescripcionComplejo] = useState('');
  const [direccionComplejo, setDireccionComplejo] = useState('');
  const [ubicacionComplejo, setUbicacionComplejo] = useState('');

  const [canchas, setCanchas] = useState([]);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [nombreCancha, setNombreCancha] = useState('');
  const [descripcionCancha, setDescripcionCancha] = useState('');
  const [precioCancha, setPrecioCancha] = useState('');
  const [turnosCancha, setTurnosCancha] = useState('');
  const [activeTab, setActiveTab] = useState('complejos');

  useEffect(() => {
    // Simular carga de datos
    setComplejos([
      { 
        id: 1, 
        nombre: 'Complejo Deportivo A', 
        descripcion: 'Amplio complejo con múltiples canchas', 
        direccion: 'Av. Principal 123', 
        ubicacion: 'Ciudad A',
        canchas: [
          { id: 1, nombre: 'Cancha de Fútbol 5', descripcion: 'Césped sintético de última generación', precio: 50, turnos: '18:00,19:00,20:00' },
          { id: 2, nombre: 'Cancha de Fútbol 7', descripcion: 'Iluminación LED y gradas para espectadores', precio: 75, turnos: '18:00,19:00,20:00,21:00' },
        ]
      },
      { 
        id: 2, 
        nombre: 'Centro Recreativo B', 
        descripcion: 'Modernas instalaciones para diversos deportes', 
        direccion: 'Calle Secundaria 456', 
        ubicacion: 'Ciudad B',
        canchas: [
          { id: 3, nombre: 'Cancha Multideporte', descripcion: 'Adaptable para básquet y vóley', precio: 60, turnos: '17:00,18:00,19:00,20:00' },
        ]
      },
    ]);
  }, []);

  useEffect(() => {
    if (complejoSeleccionado) {
      setCanchas(complejoSeleccionado.canchas || []);
    } else {
      setCanchas([]);
    }
  }, [complejoSeleccionado]);

  const limpiarFormularioComplejo = () => {
    setComplejoSeleccionado(null);
    setNombreComplejo('');
    setDescripcionComplejo('');
    setDireccionComplejo('');
    setUbicacionComplejo('');
  };

  const limpiarFormularioCancha = () => {
    setCanchaSeleccionada(null);
    setNombreCancha('');
    setDescripcionCancha('');
    setPrecioCancha('');
    setTurnosCancha('');
  };

  const seleccionarComplejo = (complejo) => {
    setComplejoSeleccionado(complejo);
    setNombreComplejo(complejo.nombre);
    setDescripcionComplejo(complejo.descripcion);
    setDireccionComplejo(complejo.direccion);
    setUbicacionComplejo(complejo.ubicacion);
    limpiarFormularioCancha();
  };

  const seleccionarCancha = (cancha) => {
    setCanchaSeleccionada(cancha);
    setNombreCancha(cancha.nombre);
    setDescripcionCancha(cancha.descripcion);
    setPrecioCancha(cancha.precio.toString());
    setTurnosCancha(cancha.turnos);
  };

  const crearComplejo = (e) => {
    e.preventDefault();
    const nuevoComplejo = {
      id: Date.now(),
      nombre: nombreComplejo,
      descripcion: descripcionComplejo,
      direccion: direccionComplejo,
      ubicacion: ubicacionComplejo,
      canchas: []
    };
    setComplejos([...complejos, nuevoComplejo]);
    limpiarFormularioComplejo();
  };

  const actualizarComplejo = (e) => {
    e.preventDefault();
    const complejosActualizados = complejos.map(complejo =>
      complejo.id === complejoSeleccionado.id
        ? { ...complejo, nombre: nombreComplejo, descripcion: descripcionComplejo, direccion: direccionComplejo, ubicacion: ubicacionComplejo }
        : complejo
    );
    setComplejos(complejosActualizados);
    setComplejoSeleccionado({ ...complejoSeleccionado, nombre: nombreComplejo, descripcion: descripcionComplejo, direccion: direccionComplejo, ubicacion: ubicacionComplejo });
  };

  const eliminarComplejo = (id) => {
    const complejosActualizados = complejos.filter(complejo => complejo.id !== id);
    setComplejos(complejosActualizados);
    limpiarFormularioComplejo();
  };

  const crearCancha = (e) => {
    e.preventDefault();
    const nuevaCancha = {
      id: Date.now(),
      nombre: nombreCancha,
      descripcion: descripcionCancha,
      precio: parseFloat(precioCancha),
      turnos: turnosCancha
    };
    const complejoActualizado = {
      ...complejoSeleccionado,
      canchas: [...complejoSeleccionado.canchas, nuevaCancha]
    };
    setComplejoSeleccionado(complejoActualizado);
    setCanchas(complejoActualizado.canchas);
    setComplejos(complejos.map(complejo =>
      complejo.id === complejoSeleccionado.id ? complejoActualizado : complejo
    ));
    limpiarFormularioCancha();
  };

  const actualizarCancha = (e) => {
    e.preventDefault();
    const canchasActualizadas = canchas.map(cancha =>
      cancha.id === canchaSeleccionada.id
        ? { ...cancha, nombre: nombreCancha, descripcion: descripcionCancha, precio: parseFloat(precioCancha), turnos: turnosCancha }
        : cancha
    );
    const complejoActualizado = {
      ...complejoSeleccionado,
      canchas: canchasActualizadas
    };
    setComplejoSeleccionado(complejoActualizado);
    setCanchas(canchasActualizadas);
    setComplejos(complejos.map(complejo =>
      complejo.id === complejoSeleccionado.id ? complejoActualizado : complejo
    ));
    limpiarFormularioCancha();
  };

  const eliminarCancha = (id) => {
    const canchasActualizadas = canchas.filter(cancha => cancha.id !== id);
    const complejoActualizado = {
      ...complejoSeleccionado,
      canchas: canchasActualizadas
    };
    setComplejoSeleccionado(complejoActualizado);
    setCanchas(canchasActualizadas);
    setComplejos(complejos.map(complejo =>
      complejo.id === complejoSeleccionado.id ? complejoActualizado : complejo
    ));
    limpiarFormularioCancha();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center', color: '#15803d' }}>Gestión de Complejos y Canchas</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('complejos')} 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: activeTab === 'complejos' ? '#15803d' : '#e5e7eb', 
            color: activeTab === 'complejos' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            marginRight: '8px',
            cursor: 'pointer'
          }}
        >
          Complejos
        </button>
        <button 
          onClick={() => setActiveTab('canchas')} 
          disabled={!complejoSeleccionado}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: activeTab === 'canchas' ? '#15803d' : '#e5e7eb', 
            color: activeTab === 'canchas' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: complejoSeleccionado ? 'pointer' : 'not-allowed',
            opacity: complejoSeleccionado ? 1 : 0.5
          }}
        >
          Canchas
        </button>
      </div>
      
      {activeTab === 'complejos' && (
        <div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              {complejoSeleccionado ? 'Editar Complejo' : 'Crear Complejo'}
            </h2>
            <form onSubmit={complejoSeleccionado ? actualizarComplejo : crearComplejo} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="nombreComplejo" style={{ display: 'block', marginBottom: '4px' }}>Nombre del complejo</label>
                <input
                  id="nombreComplejo"
                  value={nombreComplejo}
                  onChange={(e) => setNombreComplejo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="descripcionComplejo" style={{ display: 'block', marginBottom: '4px' }}>Descripción</label>
                <textarea
                  id="descripcionComplejo"
                  value={descripcionComplejo}
                  onChange={(e) => setDescripcionComplejo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '100px' }}
                />
              </div>
              <div>
                <label htmlFor="direccionComplejo" style={{ display: 'block', marginBottom: '4px' }}>Dirección</label>
                <input
                  id="direccionComplejo"
                  value={direccionComplejo}
                  onChange={(e) => setDireccionComplejo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="ubicacionComplejo" style={{ display: 'block', marginBottom: '4px' }}>Ubicación</label>
                <input
                  id="ubicacionComplejo"
                  value={ubicacionComplejo}
                  onChange={(e) => setUbicacionComplejo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {complejoSeleccionado ? 'Actualizar' : 'Crear'}
                </button>
                {complejoSeleccionado && (
                  <button type="button" onClick={limpiarFormularioComplejo} style={{ padding: '8px 16px', backgroundColor: 'white', color: 'black', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {complejos.map(complejo => (
              <div key={complejo.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                padding: '16px',
                border: complejoSeleccionado && complejoSeleccionado.id === complejo.id ? '2px solid #15803d' : 'none'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{complejo.nombre}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>{complejo.ubicacion}</p>
                <p style={{ fontSize: '0.875rem', marginBottom: '16px' }}>{complejo.descripcion}</p>
                <p style={{ fontSize: '0.875rem', color: '#2563eb', marginBottom: '16px' }}>Canchas: {complejo.canchas.length}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => seleccionarComplejo(complejo)} style={{ padding: '8px 16px', backgroundColor: 'white', color: 'black', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>✏️</span> Editar
                  </button>
                  <button onClick={() => eliminarComplejo(complejo.id)} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>🗑️</span> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'canchas' && complejoSeleccionado && (
        <div>
          <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#15803d', marginBottom: '8px' }}>
               {complejoSeleccionado.nombre}
            </h2>
            <p style={{ color: '#15803d' }}>{complejoSeleccionado.ubicacion}</p>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              {canchaSeleccionada ? 'Editar Cancha' : 'Crear Cancha'}
            </h2>
            <form onSubmit={canchaSeleccionada ? actualizarCancha : crearCancha} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="nombreCancha" style={{ display: 'block', marginBottom: '4px' }}>Nombre de la cancha</label>
                <input
                  id="nombreCancha"
                  value={nombreCancha}
                  onChange={(e) => setNombreCancha(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="descripcionCancha" style={{ display: 'block', marginBottom: '4px' }}>Descripción</label>
                <textarea
                  id="descripcionCancha"
                  value={descripcionCancha}
                  onChange={(e) => setDescripcionCancha(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px', minHeight: '100px' }}
                />
              </div>
              <div>
                <label htmlFor="precioCancha" style={{ display: 'block', marginBottom: '4px' }}>Precio</label>
                <input
                  id="precioCancha"
                  type="number"
                  value={precioCancha}
                  onChange={(e) => setPrecioCancha(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label htmlFor="turnosCancha" style={{ display: 'block', marginBottom: '4px' }}>Turnos (separados por comas)</label>
                <input
                  id="turnosCancha"
                  value={turnosCancha}
                  onChange={(e) => setTurnosCancha(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#15803d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {canchaSeleccionada ? 'Actualizar' : 'Crear'}
                </button>
                {canchaSeleccionada && (
                  <button type="button" onClick={limpiarFormularioCancha} style={{ padding: '8px 16px', backgroundColor: 'white', color: 'black', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {canchas.map(cancha => (
              <div key={cancha.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                padding: '16px',
                border: canchaSeleccionada && canchaSeleccionada.id === cancha.id ? '2px solid #15803d' : 'none'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{cancha.nombre}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>Precio: ${cancha.precio}</p>
                <p style={{ fontSize: '0.875rem', marginBottom: '8px' }}>{cancha.descripcion}</p>
                <p style={{ fontSize: '0.875rem', color: '#2563eb', marginBottom: '16px' }}>Turnos: {cancha.turnos}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={() => seleccionarCancha(cancha)} style={{ padding: '8px 16px', backgroundColor: 'white', color: 'black', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>✏️</span> Editar
                  </button>
                  <button onClick={() => eliminarCancha(cancha.id)} style={{ padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px' }}>🗑️</span> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}