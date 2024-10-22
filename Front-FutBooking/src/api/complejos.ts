import axios from "axios";

// URL base del backend
const API_URL = "http://localhost:3000"; // Ajusta la URL si es necesario

// Función para obtener complejos deportivos
export const getComplejos = async () => {
  try {
    const response = await axios.get(`${API_URL}/complejo`);
    return response.data; // Devolver los datos de complejos
  } catch (error) {
    console.error("Error al obtener los complejos:", error);
    throw error;
  }
};

export const getComplejoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/complejo/${id}`); // Asegúrate de que esta URL sea la correcta
    return response.data; // Devuelve los datos del complejo
  } catch (error) {
    console.error("Error al obtener el complejo:", error);
    throw new Error("Error al obtener el complejo");
  }
};
