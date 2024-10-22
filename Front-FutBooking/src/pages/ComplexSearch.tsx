import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getComplejos } from "../api/complejos"; // Para obtener los complejos
import { getLocalidades } from "../api/localidades"; // Para obtener las localidades

interface Complex {
  id: number;
  nombre: string;
  direccion: string;
  localidad: {
    id: number;
    nombre: string;
  };
  rangoHorario: string;
}

interface Localidad {
  id: number;
  nombre: string;
}

export default function ComplexSearch() {
  const [searchTerm, setSearchTerm] = useState(""); // Para buscar por nombre de complejo
  const [searchLocation, setSearchLocation] = useState(""); // Para la localidad seleccionada
  const [complexes, setComplexes] = useState<Complex[]>([]); // Complejos obtenidos
  const [originalComplexes, setOriginalComplexes] = useState<Complex[]>([]); // Copia de los complejos originales
  const [localidades, setLocalidades] = useState<Localidad[]>([]); // Localidades obtenidas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  useEffect(() => {
    const loadComplexesAndLocalidades = async () => {
      try {
        const [complexData, localidadData] = await Promise.all([
          getComplejos(),
          getLocalidades(),
        ]);
        setComplexes(complexData);
        setOriginalComplexes(complexData); // Guardar los complejos originales para restaurarlos
        setLocalidades(localidadData);
        setLoading(false);
      } catch (error) {
        setError("Hubo un problema al cargar los complejos y localidades.");
        setLoading(false);
      }
    };

    loadComplexesAndLocalidades();
  }, []);

  // Resetear al cambiar la localidad
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = e.target.value;
    setSearchLocation(selectedLocation);

    // Filtrar complejos según la localidad y mantener el filtro del nombre
    const filteredComplexes = originalComplexes.filter((complex) => {
      const matchesLocation =
        selectedLocation === "" ||
        complex.localidad.id === parseInt(selectedLocation);
      const matchesName = complex.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesLocation && matchesName;
    });

    setComplexes(filteredComplexes);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const filteredComplexes = originalComplexes.filter(
      (complex) =>
        complex.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchLocation === "" ||
          complex.localidad.id === parseInt(searchLocation))
    );

    setComplexes(filteredComplexes);
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Buscar Complejos Deportivos
      </h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Nombre del complejo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
          />

          <select
            value={searchLocation}
            onChange={handleLocationChange} // Cambiar la lógica al seleccionar localidad
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
          >
            <option value="">Seleccionar ubicación</option>
            {localidades.map((localidad) => (
              <option key={localidad.id} value={localidad.id.toString()}>
                {localidad.nombre}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complexes.map((complex) => (
          <div key={complex.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-black">
              {complex.nombre}
            </h3>
            <p className="text-gray-600 mb-2">{complex.localidad.nombre}</p>
            <p className="text-gray-600 mb-2">{complex.direccion}</p>
            <p className="text-yellow-500 mb-4">{complex.rangoHorario}</p>
            <Link
              to={`/complex-details/${complex.id}`} // Cambia la ruta al perfil del complejo
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Ver Detalle Complejo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
