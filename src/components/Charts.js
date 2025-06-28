import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

// Datos de ejemplo para el gráfico de barras
const barData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ventas 2023',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Datos de ejemplo para el gráfico de pie
const pieData = {
  labels: ['Producto A', 'Producto B', 'Producto C'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const BarChart = () => (
  <Bar 
    data={barData} 
    options={{ 
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    }} 
  />
);

export const PieChart = () => (
  <Pie 
    data={pieData} 
    options={{ 
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    }} 
  />
);