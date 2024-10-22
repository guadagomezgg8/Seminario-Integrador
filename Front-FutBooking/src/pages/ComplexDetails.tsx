import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockComplex = {
  id: 1,
  nombre: "Complejo Deportivo El Goleador",
  direccion: "Av. del Fútbol 123",
  localidad: "Ciudad Deportiva",
  rangoHorario: "08:00 - 23:00",
  telefono: "123-456-7890",
  imagenUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  rating: 4.8,
  canchas: [
    { id: 1, nombre: "Cancha Principal", tipo: "Fútbol 11", precio: 100, disponibilidades: ["10:00", "12:00", "14:00", "16:00", "18:00"], imagenUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 2, nombre: "Cancha Auxiliar 1", tipo: "Fútbol 7", precio: 70, disponibilidades: ["11:00", "13:00", "15:00", "17:00", "19:00"], imagenUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
    { id: 3, nombre: "Cancha Auxiliar 2", tipo: "Fútbol 5", precio: 50, disponibilidades: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"], imagenUrl: "https://images.unsplash.com/photo-1524015368236-bbf6f72545b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
  ]
};

export default function ComplexDetails() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimes, setSelectedTimes] = useState<{ [key: number]: string }>({});

  const handleReserve = (canchaId: number) => {
    if (!selectedTimes[canchaId]) {
      alert('Por favor, selecciona un horario antes de reservar.');
      return;
    }

    if (!selectedDate) {
      alert('Por favor, selecciona una fecha antes de reservar.');
      return;
    }

    alert(`Reserva confirmada para la cancha ${canchaId} el ${selectedDate} a las ${selectedTimes[canchaId]}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Complex Header */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden mb-8">
          <div className="relative h-80 overflow-hidden">
            <img 
              src={mockComplex.imagenUrl}
              alt={mockComplex.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2">{mockComplex.nombre}</h1>
                <div className="flex items-center justify-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < Math.floor(mockComplex.rating) ? "currentColor" : "none"} className="w-6 h-6" />
                  ))}
                  <span className="ml-2 text-white">{mockComplex.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-center text-gray-700 mb-4">
              <MapPin className="mr-2 text-blue-500" />
              <span>{mockComplex.direccion}, {mockComplex.localidad}</span>
            </div>
            <div className="flex flex-wrap items-center text-gray-700 mb-4">
              <Clock className="mr-2 text-blue-500" />
              <span>Horario: {mockComplex.rangoHorario}</span>
            </div>
            <div className="flex flex-wrap items-center text-gray-700">
              <Phone className="mr-2 text-blue-500" />
              <span>Teléfono: {mockComplex.telefono}</span>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
            Selecciona una fecha para tu reserva
          </label>
          <div className="relative">
            <Calendar className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md h-12"
            />
          </div>
        </div>

        {/* Fields Grid */}
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Canchas Disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockComplex.canchas.map((cancha) => (
            <div key={cancha.id} className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <img 
                src={cancha.imagenUrl}
                alt={cancha.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{cancha.nombre}</h3>
                <div className="flex items-center mb-2 text-gray-600">
                  <span className="mr-2" role="img" aria-label="soccer">⚽</span>
                  <span>{cancha.tipo}</span>
                </div>
                <p className="text-green-600 font-bold mb-4">${cancha.precio}/hora</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-gray-700">Horarios disponibles:</p>
                  <div className="flex flex-wrap gap-2">
                    {cancha.disponibilidades.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTimes(prev => ({ ...prev, [cancha.id]: time }))}
                        className={`px-3 py-1 text-sm rounded-full transition duration-300 ${
                          selectedTimes[cancha.id] === time
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleReserve(cancha.id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Reservar
                </button>
                <Link
                  to={`/field-details/${cancha.id}`}
                  className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-center block"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}