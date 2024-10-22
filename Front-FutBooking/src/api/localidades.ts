import axios from "axios";

export const getLocalidades = async () => {
  try {
    const response = await axios.get("http://localhost:3000/localidad");
    return response.data;
  } catch (error) {
    console.error("Error al obtener localidades:", error);
    return [];
  }
};
