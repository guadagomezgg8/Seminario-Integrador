import React from 'react';

const LayoutSinNavbar = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
    }}>
      <main style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: '#f0f9ff', // Light blue background
    }}>
        {children}
      </main>
      <footer style={{ 
        backgroundColor: '#15803d',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        fontSize: '0.875rem',
      }}>
        © 2023 FutBooking - Todos los derechos reservados
      </footer>
    </div>
  );
};

export default LayoutSinNavbar;
