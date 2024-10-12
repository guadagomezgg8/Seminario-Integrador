import React, { useState } from 'react';

const usuarioEjemplo = {
  nombre: "Martín",
  apellido: "Ledo",
  email: "maria.garcia@example.com",
  genero: "Femenino",
  telefono: "+34 123 456 789",
  provincia: "Madrid",
  localidad: "Madrid",
  domicilio: "Calle Gran Vía, 123",
  reservas: [
    { id: 1, fecha: "2023-06-15", hora: "18:00", cancha: "Cancha A" },
    { id: 2, fecha: "2023-06-20", hora: "20:00", cancha: "Cancha B" },
  ]
};

export default function VerPerfilUsuario() {
  const [usuario] = useState(usuarioEjemplo);

  const handleVerDetallesReserva = (reservaId) => {
    console.log(`Ver detalles de la reserva con ID: ${reservaId}`);
  };

  const handleClose = () => {
    console.log("Cerrar perfil");
  };

  const handleAdministrarComplejos = () => {
    window.location.href = "http://localhost:3000/gestion-complejos";
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', padding: '2rem' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>👤 Perfil de Usuario</h1>
            <div>
              <button 
                onClick={handleAdministrarComplejos} 
                style={{ 
                  padding: '0.5rem 1rem', 
                  backgroundColor: '#22c55e', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  marginRight: '1rem', 
                  cursor: 'pointer' 
                }}
              >
                Administrar Complejos
              </button>
              <button 
                onClick={handleClose} 
                style={{ 
                  padding: '0.5rem 1rem', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  background: 'none', 
                  cursor: 'pointer' 
                }}
              >
                ← Volver al Panel
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '128px', height: '128px', borderRadius: '50%', backgroundColor: '#dcfce7', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem' }}>
                {usuario.nombre[0]}{usuario.apellido[0]}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>{usuario.nombre} {usuario.apellido}</h2>
              <p style={{ color: '#6b7280' }}>{usuario.email}</p>
              <span style={{ display: 'inline-block', backgroundColor: '#dcfce7', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Usuario Registrado
              </span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Información Personal</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>👤 Género: {usuario.genero}</div>
                <div>📞 Tel: {usuario.telefono}</div>
                <div>📍 Provincia: {usuario.provincia}</div>
                <div>📍 Localidad: {usuario.localidad}</div>
                <div style={{ gridColumn: '1 / -1' }}>🏠 Domicilio: {usuario.domicilio}</div>
              </div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Mis Reservas</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {usuario.reservas.map((reserva) => (
                  <div key={reserva.id} style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h4 style={{ fontWeight: 'bold' }}>{reserva.cancha}</h4>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Fecha: {reserva.fecha}</p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Hora: {reserva.hora}</p>
                      </div>
                      <button 
                        onClick={() => handleVerDetallesReserva(reserva.id)}
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'none', cursor: 'pointer' }}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}