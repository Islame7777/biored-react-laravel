import React, { useEffect, useState } from 'react';
import './statistique.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function Statistiques() {
  const [comptes, setComptes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedComptes = JSON.parse(localStorage.getItem('comptes')) || [];
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setComptes(storedComptes);
    setCategories(storedCategories);
  }, []);

  const totalComptes = comptes.length;
  const totalAdmins = comptes.filter(c => c.role === 'Admin').length;
  const totalUtilisateurs = comptes.filter(c => c.role === 'Utilisateur').length;
  const totalCategories = categories.length;

  const chartData = {
    labels: ['Comptes', 'Admins', 'Utilisateurs', 'Catégories'],
    datasets: [
      {
        label: 'Statistiques',
        data: [totalComptes, totalAdmins, totalUtilisateurs, totalCategories],
        fill: false,
        borderColor: '#007bff',
        backgroundColor: '#007bff',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="container">
      <h1>Statistiques</h1>

      <div className="stat">
        <div className="stat-c">
          <h2>Total Comptes</h2>
          <p>{totalComptes}</p>
        </div>
        <div className="stat-c">
          <h2>Admins</h2>
          <p>{totalAdmins}</p>
        </div>
        <div className="stat-c">
          <h2>Utilisateurs</h2>
          <p>{totalUtilisateurs}</p>
        </div>
        <div className="stat-c">
          <h2>Catégories</h2>
          <p>{totalCategories}</p>
        </div>
      </div>

      <div className="card">
        <h2>Résumé global</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
