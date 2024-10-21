import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

interface Complex {
  id: number;
  name: string;
}

export default function FieldRegistration() {
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [fieldData, setFieldData] = useState({
    name: '',
    type: '',
    price: '',
    complexId: ''
  });

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los complejos
    // Por ahora, usaremos datos de ejemplo
    const mockComplexes = [
      { id: 1, name: 'Complejo Deportivo A' },
      { id: 2, name: 'Complejo Deportivo B' },
      { id: 3, name: 'Complejo Deportivo C' },
    ];
    setComplexes(mockComplexes);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos de la cancha a registrar:', fieldData);
    toast.success('Cancha registrada exitosamente');
    setFieldData({ name: '', type: '', price: '', complexId: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Registrar Nueva Cancha</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complexId">
            Complejo
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            id="complexId"
            name="complexId"
            value={fieldData.complexId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un complejo</option>
            {complexes.map(complex => (
              <option key={complex.id} value={complex.id}>{complex.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre de la Cancha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            id="name"
            type="text"
            placeholder="Nombre de la Cancha"
            name="name"
            value={fieldData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Tipo de Cancha
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            id="type"
            name="type"
            value={fieldData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Fútbol 5">Fútbol 5</option>
            <option value="Fútbol 7">Fútbol 7</option>
            <option value="Fútbol 11">Fútbol 11</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Precio por Hora
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            id="price"
            type="number"
            placeholder="Precio por Hora"
            name="price"
            value={fieldData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrar Cancha
          </button>
        </div>
      </form>
    </div>
  );
}
