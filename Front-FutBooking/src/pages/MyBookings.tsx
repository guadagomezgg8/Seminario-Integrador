import { useState } from 'react';

interface Booking {
  id: number;
  fieldName: string;
  date: string;
  time: string;
  duration: number;
}

const mockBookings: Booking[] = [
  { id: 1, fieldName: "Cancha A", date: "2023-06-15", time: "10:00", duration: 1 },
  { id: 2, fieldName: "Cancha B", date: "2023-06-20", time: "15:00", duration: 2 },
  { id: 3, fieldName: "Cancha C", date: "2023-06-25", time: "18:00", duration: 1 },
];

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const handleCancelBooking = (id: number) => {
    // Aquí iría la lógica para cancelar la reserva en el backend
    setBookings(bookings.filter(booking => booking.id !== id));
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Mis Reservas</h2>
      {bookings.length === 0 ? (
        <p className="text-black">No tienes reservas activas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2 text-black">{booking.fieldName}</h3>
              <p className="text-black mb-1">Fecha: {booking.date}</p>
              <p className="text-black mb-1">Hora: {booking.time}</p>
              <p className="text-black mb-4">Duración: {booking.duration} hora(s)</p>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar Reserva
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
