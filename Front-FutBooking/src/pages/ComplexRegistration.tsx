import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

interface Field {
  name: string;
  type: string;
  price: string;
}

export default function ComplexRegistration() {
  const [complexData, setComplexData] = useState({
    name: '',
    address: '',
    city: '',
    description: ''
  });

  const [fields, setFields] = useState<Field[]>([]);
  const [currentField, setCurrentField] = useState<Field>({ name: '', type: '', price: '' });

  const handleComplexInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComplexData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentField(prev => ({ ...prev, [name]: value }));
  };

  const addField = () => {
    if (currentField.name && currentField.type && currentField.price) {
      setFields(prev => [...prev, currentField]);
      setCurrentField({ name: '', type: '', price: '' });
    } else {
      toast.error('Por favor, complete todos los campos de la cancha');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos del complejo y sus canchas al backend
    console.log('Datos del complejo a registrar:', { ...complexData, fields });
    toast.success('Complejo y canchas registrados exitosamente');
    setComplexData({ name: '', address: '', city: '', description: '' });
    setFields([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6 text-black text-center">Registrar Nuevo Complejo</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre del Complejo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nombre del Complejo"
            name="name"
            value={complexData.name}
            onChange={handleComplexInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Dirección
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Dirección del Complejo"
            name="address"
            value={complexData.address}
            onChange={handleComplexInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            Ciudad
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Ciudad"
            name="city"
            value={complexData.city}
            onChange={handleComplexInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
            id="description"
            placeholder="Descripción del Complejo"
            name="description"
            value={complexData.description}
            onChange={handleComplexInputChange}
            rows={4}
          ></textarea>
        </div>

        <h2 className="text-2xl font-bold mb-4">Canchas del Complejo</h2>
        {fields.map((field, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded text-black">
            <p><strong>Nombre:</strong> {field.name}</p>
            <p><strong>Tipo:</strong> {field.type}</p>
            <p><strong>Precio por hora:</strong> ${field.price}</p>
          </div>
        ))}

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Agregar Nueva Cancha</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Nombre de la Cancha"
              name="name"
              value={currentField.name}
              onChange={handleFieldInputChange}
            />
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="type"
              value={currentField.type}
              onChange={handleFieldInputChange}
            >
              <option value="">Selecciona un tipo</option>
              <option value="Fútbol 5">Fútbol 5</option>
              <option value="Fútbol 7">Fútbol 7</option>
              <option value="Fútbol 11">Fútbol 11</option>
            </select>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Precio por Hora"
              name="price"
              value={currentField.price}
              onChange={handleFieldInputChange}
            />
          </div>
          <button
            type="button"
            onClick={addField}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Cancha
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrar Complejo y Canchas
          </button>
        </div>
      </form>
    </div>
  );
}
