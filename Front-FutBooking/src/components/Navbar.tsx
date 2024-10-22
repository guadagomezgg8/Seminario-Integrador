import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Futbooking</Link>
        <div className="flex space-x-4">
          <Link to="/complex-search" className="hover:text-indigo-200">Complejos</Link>
          <Link to="/field-search" className="hover:text-indigo-200">Canchas</Link>
          <Link to="/my-bookings" className="hover:text-indigo-200">Mis Reservas</Link>
          <Link to="/profile" className="hover:text-indigo-200">Perfil</Link>
          <Link to="/login" className="hover:text-indigo-200">Iniciar Sesión</Link>
        </div>
      </div>
    </nav>
  );
}