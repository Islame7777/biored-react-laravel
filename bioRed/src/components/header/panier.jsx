import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';

export default function Panier() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/panier')
      .then(response => setArticles(response.data))
      .catch(error => console.error("Erreur chargement panier :", error));
  }, []);

  const modifierQuantite = (id, delta) => {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    const nouvelleQuantite = Math.max(1, article.quantite + delta);

    axios.put(`http://127.0.0.1:8000/api/panier/${id}`, {
      quantite: nouvelleQuantite
    }).then(() => {
      setArticles(articles.map(a =>
        a.id === id ? { ...a, quantite: nouvelleQuantite } : a
      ));
    }).catch(err => console.error("Erreur modification quantité :", err));
  };

  const supprimerArticle = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/panier/${id}`)
      .then(() => {
        setArticles(articles.filter(article => article.id !== id));
      })
      .catch(err => console.error("Erreur suppression article :", err));
  };

  const passerALaCaisse = () => {
    axios.post('http://127.0.0.1:8000/api/commande', { articles })
      .then(() => {
        alert("Commande envoyée !");
        setArticles([]);
      })
      .catch(err => console.error("Erreur lors du checkout :", err));
  };

  const total = articles.reduce((sum, article) =>
    sum + article.prix * article.quantite, 0
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Mon Panier</h1>
        <div style={styles.cartInfo}>
          <ShoppingCart style={styles.cartIcon} />
          <span style={styles.cartCount}>{articles.length} article(s)</span>
        </div>
      </div>

      {articles.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Votre panier est vide</p>
        </div>
      ) : (
        <>
          <div style={styles.articlesList}>
            {articles.map(article => (
              <div key={article.id} style={styles.articleItem}>
                <img
                  src={article.image}
                  alt={article.nom}
                  style={styles.articleImage}
                />
                <div style={styles.articleInfo}>
                  <h2 style={styles.articleName}>{article.nom}</h2>
                  <p style={styles.articlePrice}>{article.prix.toFixed(2)} €</p>
                </div>
                <div style={styles.quantityControls}>
                  <button
                    onClick={() => modifierQuantite(article.id, -1)}
                    style={styles.quantityButton}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={styles.quantityValue}>{article.quantite}</span>
                  <button
                    onClick={() => modifierQuantite(article.id, 1)}
                    style={styles.quantityButton}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p style={styles.subtotal}>
                  {(article.prix * article.quantite).toFixed(2)} €
                </p>
                <button
                  onClick={() => supprimerArticle(article.id)}
                  style={styles.deleteButton}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button style={styles.checkoutButton} onClick={passerALaCaisse}>
              Passer à la caisse
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    margin: 0
  },
  cartInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  cartIcon: {
    marginRight: '8px',
    color: '#666666'
  },
  cartCount: {
    fontWeight: '600'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '32px 0',
    color: '#666666'
  },
  articlesList: {
    borderTop: '1px solid #e2e8f0'
  },
  articleItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #e2e8f0'
  },
  articleImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginRight: '16px'
  },
  articleInfo: {
    flexGrow: 1
  },
  articleName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333333',
    margin: '0 0 4px 0'
  },
  articlePrice: {
    fontSize: '15px',
    color: '#666666',
    margin: 0
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center'
  },
  quantityButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f1f5f9',
    cursor: 'pointer'
  },
  quantityValue: {
    margin: '0 12px',
    width: '24px',
    textAlign: 'center'
  },
  subtotal: {
    width: '96px',
    textAlign: 'right',
    fontWeight: '600',
    margin: '0 16px',
    color: '#333333'
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    padding: '8px'
  },
  footer: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: '600',
    color: '#333333'
  },
  checkoutButton: {
    width: '100%',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#3182ce',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};
