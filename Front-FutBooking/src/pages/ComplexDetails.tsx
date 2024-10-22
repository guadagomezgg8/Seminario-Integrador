import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplejoById } from "../api/complejos"; // Asegúrate de que la ruta es correcta

interface Complex {
  id: number;
  nombre: string;
  direccion: string;
  localidad: {
    id: number;
    nombre: string;
  };
  rangoHorario: string;
}

export default function ComplexDetails() {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
  const [complex, setComplex] = useState<Complex | null>(null); // Estado para los detalles del complejo
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores

  useEffect(() => {
    const fetchComplexDetails = async () => {
      if (id) {
        // Verifica que id no sea undefined
        try {
          const complexData = await getComplejoById(parseInt(id)); // Llama a la API para obtener los detalles del complejo
          setComplex(complexData);
        } catch (error) {
          setError("Hubo un problema al cargar los detalles del complejo.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("ID del complejo no encontrado."); // Maneja el caso en que el ID no esté presente
        setLoading(false);
      }
    };

    fetchComplexDetails();
  }, [id]); // Vuelve a ejecutar el efecto si el ID cambia

  if (loading) {
    return <p>Cargando detalles del complejo...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>{complex?.nombre}</h1>
      <p>Dirección: {complex?.direccion}</p>
      <p>Localidad: {complex?.localidad.nombre}</p>
      <p>Rango Horario: {complex?.rangoHorario}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
}
