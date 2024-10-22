import axios from "axios";

// Definir la URL base del backend
const API_URL = "http://localhost:3000"; // Cambia esta URL según la configuración del backend

// Función para registrar un nuevo usuario
export const registerUser = async (datosRegistro: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      datosRegistro
    );
    return response.data; // Retorna los datos si la petición fue exitosa
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error; // Lanza un error si algo salió mal
  }
};
