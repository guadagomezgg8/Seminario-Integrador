import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Phone } from "lucide-react";

interface Complejo {
  id: number;
  nombre: string;
  telefono: string;
  imagenUrl: string;
}

interface Cancha {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
  disponibilidades: string[];
  complejoId: number;
}

// Datos de ejemplo para los complejos
const mockComplejos: Complejo[] = [
  {
    id: 1,
    nombre: "Complejo 1",
    telefono: "123-456-7890",
    imagenUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    nombre: "Complejo 2",
    telefono: "098-765-4321",
    imagenUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    nombre: "Complejo 3",
    telefono: "555-555-5555",
    imagenUrl: "https://images.unsplash.com/photo-1524015368236-bbf6f72545b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

// Datos de ejemplo para las canchas
const mockCanchas: Cancha[] = [
  {
    id: 1,
    nombre: "Cancha A",
    tipo: "Fútbol 5",
    precio: 50,
    disponibilidades: ["10:00", "12:00", "14:00"],
    complejoId: 1,
  },
  {
    id: 2,
    nombre: "Cancha B",
    tipo: "Fútbol 7",
    precio: 70,
    disponibilidades: ["11:00", "13:00", "15:00"],
    complejoId: 2,
  },
  {
    id: 3,
    nombre: "Cancha C",
    tipo: "Fútbol 11",
    precio: 100,
    disponibilidades: ["16:00", "18:00", "20:00"],
    complejoId: 3,
  },
];

export default function FieldSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const complexId = searchParams.get("complexId");

  const [fields, setFields] = useState<Cancha[]>(mockCanchas);
  const [complejos, setComplejos] = useState<Complejo[]>(mockComplejos);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTime, setSelectedTime] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los datos reales
    // Por ahora, usamos los datos de ejemplo
    if (complexId) {
      const filteredFields = mockCanchas.filter(
        (cancha) => cancha.complejoId === parseInt(complexId)
      );
      setFields(filteredFields);
    } else {
      setFields(mockCanchas);
    }
  }, [complexId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFields = mockCanchas.filter((field) =>
      field.tipo.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFields(filteredFields);
  };

  const handleReserve = (fieldId: number) => {
    if (!selectedTime[fieldId]) {
      toast.error("Por favor, selecciona un horario antes de reservar.");
      return;
    }

    if (!selectedDate) {
      toast.error("Por favor, selecciona una fecha antes de reservar.");
      return;
    }

    toast(
      (t) => (
        <div>
          <p>
            ¿Confirmas la reserva para el {selectedDate} a las{" "}
            {selectedTime[fieldId]}?
          </p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
              onClick={() => {
                const field = fields.find((f) => f.id === fieldId);
                if (field) {
                  const complejo = complejos.find((c) => c.id === field.complejoId);
                  const newBooking = {
                    id: Date.now(),
                    fieldName: field.nombre,
                    complexName: complejo ? complejo.nombre : "Desconocido",
                    date: selectedDate,
                    time: selectedTime[fieldId],
                    price: field.precio,
                  };
                  // Aquí normalmente enviarías la reserva al backend
                  // Por ahora, simularemos guardando en localStorage
                  const existingBookings = JSON.parse(
                    localStorage.getItem("bookings") || "[]"
                  );
                  localStorage.setItem(
                    "bookings",
                    JSON.stringify([...existingBookings, newBooking])
                  );

                  toast.dismiss(t.id);
                  toast.success("¡Reserva registrada!");
                  navigate("/my-bookings");
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
      ),
      { duration: 10000 }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        Buscar Canchas {complexId ? `en ${complejos.find(c => c.id === parseInt(complexId))?.nombre}` : ""}
      </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fields.map((field) => {
          const complejo = complejos.find((c) => c.id === field.complejoId);
          return (
            <div key={field.id} className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img 
                src={complejo?.imagenUrl || "https://via.placeholder.com/400x200"}
                alt={complejo?.nombre || "Complejo deportivo"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {field.nombre}
                </h3>
                <p className="text-gray-600 mb-2">{field.tipo}</p>
                <p className="text-green-600 font-bold mb-2">
                  ${field.precio}/hora
                </p>
                <p className="text-gray-500 mb-2 flex items-center">
                  Complejo: {complejo?.nombre}
                </p>
                {complejo && (
                  <p className="text-gray-500 mb-4 flex items-center">
                    <Phone size={16} className="mr-2" />
                    {complejo.telefono}
                  </p>
                )}
                <div className="mb-4">
                  <p className="font-semibold mb-1 text-black">
                    Horarios disponibles:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {field.disponibilidades.map((time) => (
                      <button
                        key={time}
                        className={`px-3 py-1 text-sm rounded-full ${
                          selectedTime[field.id] === time
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        }`}
                        onClick={() =>
                          setSelectedTime((prev) => ({ ...prev, [field.id]: time }))
                        }
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReserve(field.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Reservar
                  </button>
                  <Link
                    to={`/field-details/${field.id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}