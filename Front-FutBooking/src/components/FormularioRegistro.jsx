import React, { useState } from 'react';

const FormularioRegistro = ({ onVolver }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [localidad, setLocalidad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrar usuario', { email, contraseña, nombre, apellido, telefono, direccion, localidad });
  };

  const inputStyle = {
    width: '75%',
    padding: '0.6rem 2rem 0.6rem 2.5rem', // Ajustado para inputs más pequeños
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem', // Texto más pequeño
    marginBottom: '1rem',
  };

  const iconStyle = {
    position: 'absolute',
    left: '0.75rem',
    top: '30%',
    transform: 'translateY(-50%)',
  };

  return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '8vh', // Centra el formulario en la pantalla
        backgroundColor: '#f0f9ff', // Fondo suave
      }}>
        <div style={{
          maxWidth: '1000px', // Ajustado el tamaño del formulario
          width: '100%',
          backgroundColor: 'white',
          padding: '1.9rem',
          borderRadius: '1rem',
          boxShadow: '0 1px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 1px -1px rgba(0, 0, 0, 0.06)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#15803d', 
              marginBottom: '1rem',
            }}>
              Únete al equipo
            </h2>

            <div style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>📧</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>🔒</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>👤</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>👤</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>📞</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>🏠</span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                required
                style={inputStyle}
              />
              <span style={iconStyle}>🏙️</span>
            </div>

            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '0.6rem 1rem', // Ajustado el padding
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                marginBottom: '1rem',
              }}
            >
              Unirse al equipo
            </button>

            <button 
              onClick={onVolver}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                backgroundColor: 'transparent',
                color: '#16a34a',
                border: '1px solid #16a34a',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Volver
            </button>
          </form>
        </div>
      </div>
  );
};

export default FormularioRegistro;
