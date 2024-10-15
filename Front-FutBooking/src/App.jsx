import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusquedaCanchas from './components/BusquedaCanchas'; // Tu componente de búsqueda
import FormularioInicioSesion from './components/FormularioInicioSesion';
import FormularioRegistro from './components/FormularioRegistro';
import Navbar from './components/Navbar';
import PaginaInicio from './components/PaginaInicio';
import LayoutSinNavbar from './components/LayoutSinNavbar';
import ResultadoBusqueda from './components/ResultadosBusqueda'; // Componente que creaste para los turnos
import BusquedaComplejos from './components/busqueda-complejos ';
import PerfilUsuario from './components/PerfilUsuario';
import GestionComplejosYCanchas from './components/gestion-complejos';
import GestionTurnos from './components/GestionTurnos';


const App = () => {
  const handleVolver = () => {
    console.log('Volver a la pantalla anterior');
  };

  const handleLogin = () => {
    console.log('Usuario ha iniciado sesión');
  };
  

  return (
    <Router>
      <Routes>
        {/* Rutas con Navbar */}
        <Route path="/" element={<><Navbar /><PaginaInicio /></>} />
        <Route path="/buscar-canchas" element={<><Navbar /><BusquedaCanchas /></>} /> {/* Usando BusquedaCanchas */}
        <Route path="/resultado-canchas" element={<><Navbar /><ResultadoBusqueda /></>} /> {/* Usando Component para turnos */}
        <Route path="/busqueda-complejos" element={<><Navbar /><BusquedaComplejos /></>} />
        <Route path="/gestion-complejos" element={<><Navbar /><GestionComplejosYCanchas /></>} />
        <Route path="/mi-perfil" element={<><Navbar /><PerfilUsuario /></>} />
        <Route path="/gestion-turnos" element={<><Navbar /><GestionTurnos /></>} />


        




        
        

        

        {/* Rutas sin Navbar */}
        <Route 
          path="/login" 
          element={
            <LayoutSinNavbar>
              <FormularioInicioSesion onVolver={handleVolver} onLogin={handleLogin} />
              <FormularioRegistro onVolver={handleVolver} />
            </LayoutSinNavbar>
          } 
          
        />
        <Route 
          path="/registro" 
          element={
            <LayoutSinNavbar>
              <FormularioRegistro onVolver={handleVolver} />
            </LayoutSinNavbar>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
