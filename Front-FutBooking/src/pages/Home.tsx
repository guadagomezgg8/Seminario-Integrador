import { Link } from "react-router-dom";
import { Search, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 flex items-center justify-center p-4 pt-16">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-4xl font-bold mb-2">Bienvenido a</h2>
              <h2 className="text-4xl font-bold text-blue-600 mb-4">
                Futbooking
              </h2>
              <p className="text-gray-600 mb-8">
                Reserva las mejores canchas de fútbol en tu área con facilidad y
                rapidez.
              </p>
              <div className="space-y-4">
                <Link
                  to="/complex-search"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Complejos
                </Link>
                <Link
                  to="/field-search"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Reservar Canchas
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Botas de fútbol en el campo"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-2xl font-bold px-4 text-center">
                  Tu próximo partido está a un click de distancia
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
