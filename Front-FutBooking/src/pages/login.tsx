import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para manejar errores
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Llamada a la API para iniciar sesión
      const data = await loginUser(email, password);

      // Guardar el token en localStorage (u otro almacenamiento)
      localStorage.setItem("token", data.token);

      // Redirigir a otra página después del login (puede ser dashboard o home)
      navigate("/");
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Bienvenido de vuelta
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            Inicia sesión en tu cuenta
          </h2>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Mostrar el error si ocurre */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="bg-white border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar sesión
              </button>
              <Link
                to="/register"
                className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              >
                ¿No tienes cuenta? Regístrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
