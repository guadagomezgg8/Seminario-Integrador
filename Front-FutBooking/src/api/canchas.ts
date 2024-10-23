import axios from "axios";

const API_URL = "http://localhost:3000";

export const getCanchasByFecha = async (fecha: string) => {
  try {
    const response = await axios.get(`${API_URL}/cancha?fecha=${fecha}`);
    return response.data; // Devuelve los datos del complejo
  } catch (error) {
    console.error("Error al obtener la cancha:", error);
    throw new Error("Error al obtener la cancha");
  }
};
