import  { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Datos de ejemplo para las estadísticas
const mockData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Número de Reservas',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Ingresos (en $)',
      data: [3250, 2950, 4000, 4050, 2800, 2750],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    },
  ],
};

export default function BookingStatistics() {
  const [chartData, setChartData] = useState(mockData);

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener datos reales
    // Por ahora, usamos los datos de ejemplo
    setChartData(mockData);
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category' as const,
      },
      y: {
        type: 'linear' as const,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Estadísticas de Reservas',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Estadísticas de Reservas</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}