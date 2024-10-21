import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-6">
      <ul className="flex space-x-4">
        <li>
          <Link to="/admin/complex-registration" className="text-white hover:text-gray-300">
            Registrar Complejo
          </Link>
        </li>
        <li>
          <Link to="/admin/field-registration" className="text-white hover:text-gray-300">
            Registrar Cancha
          </Link>
        </li>
        <li>
          <Link to="/admin/booking-statistics" className="text-white hover:text-gray-300">
            Estadísticas de Reservas
          </Link>
        </li>
        <li>
          <Link to="/admin/logout" className="text-white hover:text-gray-300">
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
