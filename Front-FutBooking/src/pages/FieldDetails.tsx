import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Field {
  id: number;
  name: string;
  type: string;
  price: number;
  availableTimes: string[];
}

const mockFieldDetails: Field = {
  id: 1,
  name: "Cancha A",
  type: "Fútbol 5",
  price: 50,
  availableTimes: ["10:00", "12:00", "14:00"],
};

interface BookingDetails {
  date: string;
  selectedTime: string;
}

export default function FieldDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: '',
    selectedTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingDetails(prev => ({ ...prev, selectedTime: time }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la reserva
    console.log('Booking submitted', { fieldId: id, ...bookingDetails });
    // Mostrar un hoattoaster o notificación
    alert('Reserva registrada');
    // Redirigir al componente de confirmación o detalles de la reserva
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black mb-4">
            Detalles de {mockFieldDetails.name}
          </h2>
          <p className="text-gray-600 mb-2">{mockFieldDetails.type}</p>
          <p className="text-green-600 font-bold mb-4">${mockFieldDetails.price}/hora</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Fecha
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                value={bookingDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <p className="font-semibold mb-1 text-black">Horarios disponibles:</p>
              <div className="flex flex-wrap gap-2">
                {mockFieldDetails.availableTimes.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${bookingDetails.selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={!bookingDetails.date || !bookingDetails.selectedTime}
            >
              Confirmar Reserva
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
