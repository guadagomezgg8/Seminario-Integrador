import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 FutbolReservas. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-gray-300">Acerca de</Link>
            <Link to="/contact" className="hover:text-gray-300">Contacto</Link>
            <Link to="/privacy" className="hover:text-gray-300">Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}