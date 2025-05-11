import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './dashboard.css'; // Assure-toi que ce chemin est correct
import '@fortawesome/fontawesome-free/css/all.min.css';


const Dashboard = () => {
    const categoryChartRef = useRef(null);
    const salesChartRef = useRef(null);
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
                backgroundColor: ['#68423D', '#7B5343', '#87624A', '#32342d']
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          });
      
          salesChartInstance = new Chart(salesChartRef.current, {
            type: 'line',
            data: {
              labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
              datasets: [{
                label: 'Ventes',
                data: [650, 590, 800, 810, 960, 890],
                borderColor: '#32342d',
                tension: 0.4
              }]
            },
            options: {
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
            }
          });
        }
      
        // Nettoyage si le composant est démonté
        return () => {
          if (categoryChartInstance) categoryChartInstance.destroy();
          if (salesChartInstance) salesChartInstance.destroy();
        };
      }, []);
      

  return (
    <div className="b">
      {/* Header */}
      <header className="header">
  <div className="header-left">
    <h1>Tableau de bord</h1>
    <p>Bienvenue dans votre espace administrateur</p>
  </div>
  <div className="header-right">

  </div>
</header>


      {/* Stats cards */}
      <div className="stats-grid">
  {[
    { icon: 'fa-box', label: 'Produits', id: 'totalProducts', color: 'blue' },
    { icon: 'fa-tags', label: 'Catégories', id: 'totalCategories', color: 'purple' },
    { icon: 'fa-dollar-sign', label: 'Prix Moyen', id: 'averagePrice', color: 'green' },

  ].map((item, i) => (
    <div key={i} className={`cards`}>
      <div className=" cards-header">
        <div className={`icon bg-${item.color}`}>
          <i className={`fas ${item.icon}`}></i>
        </div>
        <span className="label">{item.label}</span>
      </div>
      <h3 className="cards-value" id={item.id}>{item.value || '0'}</h3>
      <p className={`cards-trend ${item.color}`}>
        <i className={`fas ${item.label === 'Vues' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
        <span>
          {item.label === 'Catégories' ? 'Stable' : item.label === 'Vues' ? '3% ce mois' : item.label === 'Produits' ? '12% ce mois' : '5% ce mois'}
        </span>
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
