import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, ChevronRight, Lock, LogIn, Star } from 'lucide-react';

const HomePage = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginReason, setLoginReason] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenLoginDialog = (reason) => {
    setLoginReason(reason);
    setLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => setLoginDialogOpen(false);

  const handleNavigation = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/produits');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        const first4 = Array.isArray(data) ? data.slice(0, 4) : [];
        setFeaturedProducts(first4);
      } catch (err) {
        // Demo data in case of error
        setFeaturedProducts([
          {
            id: 1,
            name: "Produit Bio Premium",
            price: "29.99€",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
            description: "Un produit bio de qualité exceptionnelle pour votre bien-être quotidien."
          },
          {
            id: 2,
            name: "Complément Naturel",
            price: "19.99€",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=250&fit=crop",
            description: "Complément alimentaire 100% naturel pour booster votre énergie."
          },
          {
            id: 3,
            name: "Huile Essentielle",
            price: "15.99€",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=250&fit=crop",
            description: "Huile essentielle pure pour votre aromathérapie et détente."
          },
          {
            id: 4,
            name: "Tisane Wellness",
            price: "12.99€",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=250&fit=crop",
            description: "Mélange de plantes biologiques pour votre bien-être intérieur."
          }
        ]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star full" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" />);
    }
    return stars;
  };

  return (
    <div className="homepage-bg">
      {/* STYLE INLINE */}
      <style>
        {`
        .homepage-bg {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f0fdf4, #d1fae5);
          font-family: 'Segoe UI', sans-serif;
        }
        .header {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #d1fae5;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-container {
          max-width: 1200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .menu-btn {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 0.75rem;
          color: #059669;
          cursor: pointer;
          font-size: 1.25rem;
          margin-right: 0.5rem;
          transition: background .2s;
        }
        .menu-btn:hover {
          background: #f0fdf4;
        }
        .logo-text {
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(to right, #059669, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .search-bar {
          position: relative;
          display: none;
        }
        @media (min-width: 768px) {
          .search-bar { display: block; }
        }
        .search-input {
          width: 16rem;
          padding: 0.5rem 2.5rem 0.5rem 1rem;
          border: 1px solid #bbf7d0;
          border-radius: 9999px;
          background-color: rgba(255,255,255,0.8);
          outline: none;
        }
        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 0.55rem;
          color: #34d399;
        }
        .icon-btn {
          background: none;
          border: none;
          border-radius: 9999px;
          color: #059669;
          cursor: pointer;
          padding: 0.5rem;
          font-size: 1.2rem;
          position: relative;
          transition: background .2s, transform .2s;
        }
        .icon-btn:hover {
          background: #bbf7d0;
          transform: scale(1.05);
        }
        .cart-btn .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #10b981;
          color: white;
          font-size: 0.7rem;
          width: 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
        }
        .hero {
          position: relative;
          height: 24rem;
          background: linear-gradient(135deg, rgba(34,197,94,0.9), rgba(16,185,129,0.9)),
                      url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=500&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.2);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 1rem;
          color: #fff;
        }
        .hero-content h2 {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .hero-content .accent {
          color: #bbf7d0;
        }
        .hero-content p {
          font-size: 1.2rem;
          color: #d1fae5;
          margin-bottom: 2rem;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #fff;
          color: #059669;
          font-weight: bold;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background .2s, transform .2s;
        }
        .hero-btn:hover {
          background: #f0fdf4;
          transform: scale(1.05);
        }
        .hero-wave {
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          width: 100%;
          height: 80px;
          z-index: 3;
          fill: #fff;
          pointer-events: none;
        }
        .products-section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .products-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .products-header h3 {
          font-size: 2.5rem;
          font-weight: bold;
          color: #111827;
        }
        .products-header .accent { color: #059669; }
        .products-header p {
          font-size: 1.1rem;
          color: #4b5563;
          margin: 1rem 0 0 0;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }
        .product-card {
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid #bbf7d0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow .2s, transform .2s;
        }
        .product-card:hover {
          transform: translateY(-0.5rem);
          box-shadow: 0 8px 32px rgba(16,185,129,0.13);
        }
        .product-img-box {
          position: relative;
          width: 100%;
          height: 12rem;
          overflow: hidden;
        }
        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s;
        }
        .product-card:hover .product-img {
          transform: scale(1.1);
        }
        .new-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #10b981;
          color: #fff;
          font-size: 0.9rem;
          font-weight: bold;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(16,185,129,0.14);
        }
        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .product-info h4 {
          font-size: 1.15rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.3rem;
        }
        .product-info .stars {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 0.7rem;
        }
        .product-info .note {
          margin-left: 0.5rem;
          color: #6b7280;
          font-size: 0.95rem;
        }
        .product-info p {
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 1.2rem;
        }
        .product-info .price {
          font-size: 1.25rem;
          font-weight: bold;
          color: #059669;
          margin-bottom: 1rem;
        }
        .card-btns {
          display: flex;
          gap: 0.5rem;
        }
        .btn {
          flex: 1;
          padding: 0.6rem 0.2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s, color .2s, border .2s, transform .2s;
          font-size: 1rem;
          border: none;
        }
        .btn-outline {
          background: transparent;
          color: #059669;
          border: 2px solid #059669;
        }
        .btn-outline:hover {
          background: #bbf7d0;
        }
        .btn-fill {
          background: linear-gradient(to right, #059669, #10b981);
          color: #fff;
          border: none;
          box-shadow: 0 2px 8px rgba(16,185,129,0.10);
        }
        .btn-fill:hover {
          background: linear-gradient(to right, #047857, #059669);
          transform: scale(1.05);
        }
        .full {
          width: 100%;
        }
        .btn-alt {
          background: #f0fdf4;
          color: #059669;
          border: none;
        }
        .btn-cancel {
          background: none;
          color: #6b7280;
          border: none;
        }
        .btn-cancel:hover {
          color: #111827;
          background: #e5e7eb;
        }
        .star { width: 1.1em; height: 1.1em; margin-right: 0.07em; }
        .star.full { fill: #facc15; color: #facc15; }
        .star.half { fill: #fde68a; color: #fde68a; }
        .star.empty { fill: #e5e7eb; color: #e5e7eb; }
        .loading {
          text-align: center;
          padding: 2rem;
        }
        .spinner {
          display: inline-block;
          border: 3px solid #bbf7d0;
          border-top: 3px solid #10b981;
          border-radius: 50%;
          width: 2.2rem;
          height: 2.2rem;
          animation: spin 1s linear infinite;
          margin-bottom: 0.5rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .error { color: #dc2626; text-align: center; padding: 2rem; font-weight: bold; }
        .login-dialog-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.52);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          animation: fadein 0.18s;
        }
        @keyframes fadein { from{opacity:0} to{opacity:1} }
        .login-dialog {
          background: #fff;
          border-radius: 1.25rem;
          box-shadow: 0 8px 28px rgba(16,185,129,0.19);
          max-width: 380px;
          width: 100%;
          padding: 2rem;
          animation: slidein .22s;
          display: flex;
          flex-direction: column;
        }
        @keyframes slidein {
          from {transform: translateY(40px); opacity:0;}
          to   {transform: translateY(0); opacity:1;}
        }
        .login-dialog-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;
          gap: 0.7rem;
        }
        .login-dialog-icon {
          width: 2.3rem;
          height: 2.3rem;
          background: #bbf7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: #059669;
          font-size: 1.2rem;
        }
        .login-dialog-header h3 {
          font-size: 1.25rem;
          font-weight: bold;
          color: #111827;
        }
        .login-dialog-message {
          color: #4b5563;
          margin-bottom: 1.4rem;
          font-size: 0.98rem;
        }
        .login-dialog-fields {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.4rem;
        }
        .login-dialog-fields label {
          display: flex;
          flex-direction: column;
          color: #374151;
          font-size: 0.97rem;
        }
        .login-dialog-fields input {
          margin-top: 0.3rem;
          padding: 0.7rem;
          border-radius: 0.7rem;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 1rem;
          transition: border .2s;
        }
        .login-dialog-fields input:focus {
          border-color: #10b981;
        }
        .login-dialog-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .footer {
          background: linear-gradient(to right, #111827, #064e3b);
          color: white;
          padding: 4rem 1rem 2rem 1rem;
        }
        .footer-container {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2.5rem;
        }
        .footer-col h4 {
          font-size: 1.25rem;
          color: #6ee7b7;
          margin-bottom: 1rem;
        }
        .footer-col p {
          color: #d1d5db;
          font-size: 0.97rem;
          line-height: 1.7;
        }
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-col ul li {
          color: #d1d5db;
          font-size: 0.97rem;
          margin-bottom: 0.5rem;
        }
        .footer-col ul li a {
          color: #d1d5db;
          text-decoration: none;
          transition: color .2s;
        }
        .footer-col ul li a:hover {
          color: #6ee7b7;
        }
        .newsletter {
          display: flex;
          margin-top: 1rem;
        }
        .newsletter input {
          padding: 0.5rem 1rem;
          flex: 1;
          border-radius: 0.5rem 0 0 0.5rem;
          border: none;
          font-size: 0.95rem;
          color: #111827;
        }
        .newsletter button {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #10b981;
          color: white;
          font-weight: bold;
          border-radius: 0 0.5rem 0.5rem 0;
          cursor: pointer;
          transition: background .2s;
        }
        .newsletter button:hover {
          background-color: #059669;
        }
        .footer-bottom {
          text-align: center;
          margin-top: 3rem;
          color: #9ca3af;
          font-size: 0.95rem;
        }
        `}
      </style>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button 
              onClick={handleNavigation}
              className="menu-btn"
            >
              <Menu size={24} />
            </button>
            <h1 className="logo-text">biored</h1>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
              />
              <span className="search-icon">
                <Search size={20} />
              </span>
            </div>
            <button onClick={handleNavigation} className="icon-btn">
              <User size={24} />
            </button>
            <button onClick={handleNavigation} className="icon-btn cart-btn">
              <ShoppingCart size={24} />
              <span className="cart-badge">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2>
            Des produits <span className="accent">exceptionnels</span>
          </h2>
          <p>
            Découvrez notre sélection de produits haut de gamme à des prix imbattables.
          </p>
          <button onClick={handleNavigation} className="hero-btn">
            Voir les offres <ChevronRight size={20} />
          </button>
        </div>
        <svg viewBox="0 0 1440 120" className="hero-wave">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="products-header">
          <h3>
            Produits en <span className="accent">vedette</span>
          </h3>
          <p>
            Découvrez nos produits les plus populaires, soigneusement sélectionnés pour vous
          </p>
        </div>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des produits...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-box">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  <div className="new-badge">Nouveau</div>
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="stars">{getRatingStars(product.rating || 0)}
                    <span className="note">({(product.rating || 0).toFixed(1)})</span>
                  </div>
                  <p>{product.description}</p>
                  <div className="price">{product.price}</div>
                  <div className="card-btns">
                    <button onClick={handleNavigation} className="btn btn-outline">Détails</button>
                    <button onClick={handleNavigation} className="btn btn-fill">Ajouter</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Login Dialog */}
      {loginDialogOpen && (
        <div className="login-dialog-backdrop">
          <div className="login-dialog">
            <div className="login-dialog-header">
              <span className="login-dialog-icon"><Lock size={20} /></span>
              <h3>Connexion requise</h3>
            </div>
            <div className="login-dialog-message">
              {loginReason === 'profil' && "Veuillez vous connecter pour accéder à votre profil."}
              {loginReason === 'panier' && "Veuillez vous connecter pour gérer votre panier d'achats."}
              {loginReason === 'offres' && "Veuillez vous connecter pour voir nos offres exclusives."}
              {loginReason === 'détails' && "Veuillez vous connecter pour voir les détails du produit."}
              {loginReason === 'newsletter' && "Veuillez vous connecter pour vous inscrire à notre newsletter."}
              {loginReason === 'catégorie' && "Veuillez vous connecter pour accéder à cette catégorie."}
            </div>
            <div className="login-dialog-fields">
              <label>Email
                <input type="email" placeholder="votre@email.com" />
              </label>
              <label>Mot de passe
                <input type="password" placeholder="••••••••" />
              </label>
            </div>
            <div className="login-dialog-actions">
              <button onClick={handleNavigation} className="btn btn-fill full">
                <LogIn size={18} style={{marginRight: 8}} /> Se connecter
              </button>
              <button onClick={handleNavigation} className="btn full btn-alt">
                Créer un compte
              </button>
              <button onClick={handleCloseLoginDialog} className="btn full btn-cancel">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col">
            <h4>À propos</h4>
            <p>
              BioRed est votre destination pour des produits bio de qualité et un service client exceptionnel.
            </p>
          </div>
          <div className="footer-col">
            <h4>Liens utiles</h4>
            <ul>
              <li><a href="#">Conditions d'utilisation</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
              <li><a href="#">Livraison et retours</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>Email: contact@biored.fr</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Adresse: 123 Rue Verte, Paris</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Restez informé de nos dernières offres</p>
            <div className="newsletter">
              <input type="email" placeholder="Votre email" />
              <button>S'abonner</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} BioRed. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
