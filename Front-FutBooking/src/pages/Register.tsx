import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/register";
import { getLocalidades } from "../api/localidades";

// Definir el tipo de Localidad
interface Localidad {
  id: number;
  nombre: string;
}

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Llamar a la API para obtener las localidades al cargar la página
    getLocalidades().then((data) => {
      setLocalidades(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rol = isOwner ? "Administrador" : "Cliente";

    const data = {
      email,
      contrasena,
      nombre,
      apellido,
      telefono,
      direccion,
      localidad: selectedLocalidad,
      rol,
    };

    try {
      await registerUser(data);
      navigate("/login"); // Navegar a la pantalla de inicio de sesión después del registro
    } catch (error) {
      setError("Error during registration. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Únete a nosotros
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            Crea tu cuenta
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Juan"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="apellido"
              >
                Apellido
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                placeholder="Pérez"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="contrasena"
              >
                Contraseña
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="contrasena"
                type="password"
                placeholder="******************"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="text"
                placeholder="111-222-333"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="direccion"
              >
                Dirección
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="direccion"
                type="text"
                placeholder="Calle 123"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="localidad"
              >
                Localidad
              </label>
              <select
                className="bg-white border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="localidad"
                value={selectedLocalidad}
                onChange={(e) => setSelectedLocalidad(e.target.value)}
                required
              >
                <option value="">Selecciona una localidad</option>
                {localidades.map((localidad) => (
                  <option key={localidad.id} value={localidad.nombre}>
                    {localidad.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="flex items-center text-black">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={isOwner}
                  onChange={(e) => setIsOwner(e.target.checked)}
                />
                <span className="ml-2">Soy dueño de complejos deportivos</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Registrarse
              </button>
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
