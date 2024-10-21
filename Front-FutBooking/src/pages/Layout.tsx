import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-600 text-white">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">FutbolReservas</Link>
          <div className="space-x-4">
            <Link to="/complejos" className="hover:underline">Complejos</Link>
            <Link to="/canchas" className="hover:underline">Canchas</Link>
            <Link to="/mis-reservas" className="hover:underline">Mis Reservas</Link>
            <Link to="/perfil" className="hover:underline">Perfil</Link>
            <Link to="/iniciar-sesion" className="hover:underline">Iniciar Sesión</Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2023 FutbolReservas. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}