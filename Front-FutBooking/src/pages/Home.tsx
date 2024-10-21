import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Bienvenido a FutbolReservas</h1>
      <p className="text-xl mb-8 text-gray-600">Encuentra y reserva las mejores canchas de fútbol en tu área</p>
      <div className="space-x-4">
        <Link
          to="/complex-search"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Buscar Complejos
        </Link>
        <Link
          to="/field-search"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Buscar Canchas
        </Link>
      </div>
    </div>
  );
}