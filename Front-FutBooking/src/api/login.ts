import axios from "axios";

// Definir la URL base del backend
const API_URL = "http://localhost:3000"; // Asegúrate de que esta URL sea la correcta para tu backend

// Función para iniciar sesión
export const loginUser = async (email: string, contrasena: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      contrasena,
    });

    // Retornar el token de autenticación
    return response.data; // Aquí puede venir el token JWT y otros datos
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
