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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 👉 Remplace les URL par les tiennes
        const [comptesRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:8000/api/compte'),
          fetch('http://localhost:8000/api/categories'),
        ]);
        const comptesData = await comptesRes.json();
        const categoriesData = await categoriesRes.json();
        setComptes(comptesData);
        setCategories(categoriesData);
      } catch (err) {
        alert("Erreur lors de la récupération des données !");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalComptes = comptes.length;
  const totalAdmins = comptes.filter(c => c.role?.toLowerCase() === 'admin').length;
  const totalUtilisateurs = comptes.filter(c => c.role?.toLowerCase() === 'utilisateur').length;
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
          <p>{loading ? '...' : totalComptes}</p>
        </div>
        <div className="stat-c">
          <h2>Admins</h2>
          <p>{loading ? '...' : totalAdmins}</p>
        </div>
        <div className="stat-c">
          <h2>Utilisateurs</h2>
          <p>{loading ? '...' : totalUtilisateurs}</p>
        </div>
        <div className="stat-c">
          <h2>Catégories</h2>
          <p>{loading ? '...' : totalCategories}</p>
        </div>
      </div>

      <div className="card">
        <h2>Résumé global</h2>
        {!loading ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div style={{textAlign: "center", color: "#007bff", fontSize: 24, padding: 32}}>Chargement…</div>
        )}
      </div>
    </div>
  );
}
