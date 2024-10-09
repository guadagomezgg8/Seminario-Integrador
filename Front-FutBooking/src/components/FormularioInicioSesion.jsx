import React, { useState } from 'react';

const FormularioInicioSesion = ({ onVolver, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciar sesión', { email, password });
    onLogin();
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#15803d', 
          marginBottom: '1rem',
        }}>
          Iniciar Sesión
        </h2>
        <div style={{ position: 'relative' }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '90%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>📧</span>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '90%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>🔒</span>
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem 2rem',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Entrar al juego
        </button>
        <button 
          onClick={onVolver}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
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
  );
};

export default FormularioInicioSesion;
