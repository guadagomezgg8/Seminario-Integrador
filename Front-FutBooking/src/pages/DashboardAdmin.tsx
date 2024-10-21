import { Link } from 'react-router-dom';

export default function DashboardAdmin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/complex-registration" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Registrar Complejo</h2>
          <p>Añade un nuevo complejo deportivo a tu portfolio</p>
        </Link>
        <Link to="/admin/field-registration" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Registrar Cancha</h2>
          <p>Agrega una nueva cancha a uno de tus complejos</p>
        </Link>
        <Link to="/admin/booking-statistics" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Estadísticas de Reservas</h2>
          <p>Visualiza las estadísticas de reservas de tus complejos</p>
        </Link>
      </div>
    </div>
  );
}
