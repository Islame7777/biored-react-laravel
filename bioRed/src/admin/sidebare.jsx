import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faHome,
  faBox,
  faListUl,
  faUserTie,
  faChartLine,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import './sidebare.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmation) {
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1 className="sidebar-title">BIO RED</h1>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-links">
          <a href="/admin" className="sidebar-link">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            <span>Dashboard</span>
          </a>

          <a href="/admin/produit" className="sidebar-link">
            <FontAwesomeIcon icon={faBox} className="sidebar-icon" />
            <span>Produits</span>
          </a>

          <a href="/admin/categorie" className="sidebar-link">
            <FontAwesomeIcon icon={faListUl} className="sidebar-icon" />
            <span>Catégories</span>
          </a>

          <a href="/admin/gestion" className="sidebar-link">
            <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
            <span>gestion</span>
          </a>
          <a href="/admin/commande" className="sidebar-link">
            <FontAwesomeIcon icon={faBox} className="sidebar-icon" />
            <span>commande</span>
          </a>
          <a href="/admin/statistique" className="sidebar-link">
            <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
            <span>Statistiques</span>
          </a>
        </div>

      </nav>
      <button onClick={handleLogout} className="sidebar-link">
        <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
        <span>Déconnexion</span>
      </button>
   
    </div>
  )
};

export default Sidebar;
