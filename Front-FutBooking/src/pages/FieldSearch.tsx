import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

interface Field {
  id: number;
  name: string;
  type: string;
  price: number;
  availableTimes: string[];
  complexName: string;
}

const mockFields: Field[] = [
  { id: 1, name: "Cancha A", type: "Fútbol 5", price: 50, availableTimes: ["10:00", "12:00", "14:00"], complexName: "Complejo 1" },
  { id: 2, name: "Cancha B", type: "Fútbol 7", price: 70, availableTimes: ["11:00", "13:00", "15:00"], complexName: "Complejo 2" },
  { id: 3, name: "Cancha C", type: "Fútbol 11", price: 100, availableTimes: ["16:00", "18:00", "20:00"], complexName: "Complejo 3" },
];

export default function FieldSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const complexId = searchParams.get('complexId');
  
  const [fields, setFields] = useState<Field[]>(mockFields);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTime, setSelectedTime] = useState<{ [key: number]: string }>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFields = mockFields.filter(
      field => field.type.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFields(filteredFields);
  };

  const handleReserve = (fieldId: number) => {
    if (!selectedTime[fieldId]) {
      toast.error('Por favor, selecciona un horario antes de reservar.');
      return;
    }

    if (!selectedDate) {
      toast.error('Por favor, selecciona una fecha antes de reservar.');
      return;
    }

    toast((t) => (
      <div>
        <p>¿Confirmas la reserva para el {selectedDate} a las {selectedTime[fieldId]}?</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
            onClick={() => {
              const field = fields.find(f => f.id === fieldId);
              if (field) {
                const newBooking = {
                  id: Date.now(),
                  fieldName: field.name,
                  complexName: field.complexName,
                  date: selectedDate,
                  time: selectedTime[fieldId],
                  price: field.price
                };
                // Aquí normalmente enviarías la reserva al backend
                // Por ahora, simularemos guardando en localStorage
                const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
                
                toast.dismiss(t.id);
                toast.success('¡Reserva registrada!');
                navigate('/my-bookings');
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: 10000 });
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4 text-black">Buscar Canchas {complexId ? `en Complejo ${complexId}` : ''}</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-black leading-tight focus:outline-none focus:border-indigo-500"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-grow bg-white border border-gray-400 rounded py-2 px-3 text-black leading-tight focus:outline-none focus:border-indigo-500"
          >
            <option value="">Todos los tipos</option>
            <option value="Fútbol 5">Fútbol 5</option>
            <option value="Fútbol 7">Fútbol 7</option>
            <option value="Fútbol 11">Fútbol 11</option>
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
        {fields.map(field => (
          <div key={field.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2 text-black">{field.name}</h3>
            <p className="text-gray-600 mb-2">{field.type}</p>
            <p className="text-green-600 font-bold mb-2">${field.price}/hora</p>
            <p className="text-gray-500 mb-2">Complejo: {field.complexName}</p>
            <div className="mb-4">
              <p className="font-semibold mb-1 text-black">Horarios disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {field.availableTimes.map(time => (
                  <button
                    key={time}
                    className={`px-3 py-1 text-sm rounded-full ${selectedTime[field.id] === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSelectedTime(prev => ({ ...prev, [field.id]: time }))}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleReserve(field.id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Reservar
              </button>
              <Link
                to={`/field-details/${field.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}