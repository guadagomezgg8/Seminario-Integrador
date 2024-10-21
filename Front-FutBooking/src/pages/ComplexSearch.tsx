import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Complex {
  id: number;
  name: string;
  location: string;
  rating: number;
}

const mockComplexes: Complex[] = [
  { id: 1, name: "Complejo Deportivo A", location: "Ciudad A", rating: 4.5 },
  { id: 2, name: "Complejo Deportivo B", location: "Ciudad B", rating: 4.2 },
  { id: 3, name: "Complejo Deportivo C", location: "Ciudad C", rating: 4.8 },
];

export default function ComplexSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [complexes, setComplexes] = useState<Complex[]>(mockComplexes);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredComplexes = mockComplexes.filter(
      complex => complex.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                 complex.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setComplexes(filteredComplexes);
  };

  return (
    <div className="p-4 bg-gray-100"> {/* Fondo gris claro para el contenedor principal */}
      <h2 className="text-2xl font-bold mb-4 text-black">Buscar Complejos Deportivos</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Nombre del complejo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complexes.map(complex => (
          <div key={complex.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-black">{complex.name}</h3>
            <p className="text-gray-600 mb-2">{complex.location}</p>
            <p className="text-yellow-500 mb-4">{'★'.repeat(Math.round(complex.rating))} ({complex.rating})</p>
            <Link
              to={`/field-search?complexId=${complex.id}`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Ver Canchas
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
