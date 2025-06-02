import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalPrice: 0,
  });

  const categoryChartRef = useRef(null);
  const salesChartRef = useRef(null);

  // 1️⃣ Fetch des stats au montage
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('http://localhost:8000/api/produits'),
          fetch('http://localhost:8000/api/categories'),
        ]);
        const products   = await prodRes.json();
        const categories = await catRes.json();

        const totalProducts   = Array.isArray(products) ? products.length : 0;
        const totalCategories = Array.isArray(categories) ? categories.length : 0;
        const totalPrice = Array.isArray(products)
          ? products.reduce((sum, p) => sum + (p.prix || 0), 0)
          : 0;

        setStats({ totalProducts, totalCategories, totalPrice });
      } catch (err) {
        console.error('Erreur récupération stats :', err);
      }
    };

    fetchStats();
  }, []);

  // 2️⃣ Création des charts Chart.js
  useEffect(() => {
    let categoryChartInstance;
    let salesChartInstance;

    if (categoryChartRef.current && salesChartRef.current) {
      categoryChartInstance = new Chart(categoryChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Peinture Cuir', 'Peinture Acrylique', 'Pinceaux', 'Accessoires'],
          datasets: [{
            data: [30, 25, 20, 25],
            backgroundColor: ['#68423D', '#7B5343', '#87624A', '#32342d'],
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } },
        },
      });

      salesChartInstance = new Chart(salesChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
          datasets: [{
            label: 'Ventes',
            data: [650, 590, 800, 810, 960, 890],
            borderColor: '#32342d',
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    return () => {
      if (categoryChartInstance) categoryChartInstance.destroy();
      if (salesChartInstance) salesChartInstance.destroy();
    };
  }, []);

  // 3️⃣ Préparation des items à afficher
  const items = [
    {
      icon: 'fa-box',
      label: 'Produits',
      id: 'totalProducts',
      color: 'blue',
      value: stats.totalProducts,
      trend: '12% ce mois',
    },
    {
      icon: 'fa-tags',
      label: 'Catégories',
      id: 'totalCategories',
      color: 'purple',
      value: stats.totalCategories,
      trend: 'Stable',
    },
    {
      icon: 'fa-dollar-sign',
      label: 'Prix Total',
      id: 'totalPrice',
      color: 'green',
      value: stats.totalPrice.toFixed(2),
      trend: '5% ce mois',
    },
  ];

  return (
    <div className="b">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>Tableau de bord</h1>
          <p>Bienvenue dans votre espace administrateur</p>
        </div>
      </header>

      {/* Stats cards */}
      <div className="stats-grid">
        {items.map((item, i) => (
          <div key={i} className="cards">
            <div className="cards-header">
              <div className={`icon bg-${item.color}`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span className="label">{item.label}</span>
            </div>
            <h3 className="cards-value" id={item.id}>
              {item.value}
            </h3>
            <p className={`cards-trend ${item.color}`}>
              <i
                className={`fas ${
                  item.trend === 'Stable' ? 'fa-arrows-alt-h' : 'fa-arrow-up'
                }`}
              ></i>
              <span>{item.trend}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-cards">
          <h3 className="chart-title">Ventes par Catégorie</h3>
          <canvas ref={categoryChartRef} height="200"></canvas>
        </div>
        <div className="chart-cards">
          <h3 className="chart-title">Tendance des Ventes</h3>
          <canvas ref={salesChartRef} height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
