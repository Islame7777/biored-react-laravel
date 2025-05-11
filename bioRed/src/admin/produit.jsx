import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './produit.css';

export default function Product() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    categorie_id: '',
    prix: '',
    stock: '',
    description: ''
  });
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProduits();
    fetchCategories();
  }, []);

  const fetchProduits = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/produits');
      setProduits(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories :', error);
    }
  };

  const toggleAddModal = () => {
    setShowModal(!showModal);
    setFormData({
      nom: '',
      categorie_id: '',
      prix: '',
      stock: '',
      description: ''
    });
    setIsEditing(false);
    setEditId(null);
  };

  const enregistrer = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/produits/${editId}`, formData);
      } else {
        await axios.post('http://localhost:8000/api/produits', formData);
      }
      fetchProduits();
      toggleAddModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/produits/${id}`);
      fetchProduits();
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === parseInt(id));
    return cat ? cat.name : 'Catégorie inconnue';
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="title">Produit</h1>
          <p className="subtitle">Bienvenue dans votre espace administrateur</p>
        </div>
        <div className="header-actions">
          <button className="btn-new" onClick={toggleAddModal}>
            <i className="fas fa-plus"></i>
            <span>Nouveau Produit</span>
          </button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Produits</h3>
            <div className="icon"><i className="fas fa-cube"></i></div>
          </div>
          <div className="stat-footer">
            <div>
              <p className="stat-value">{produits.length}</p>
              <p>Produits actifs</p>
            </div>
            <div className="trend up">
              <i className="fas fa-arrow-up"></i>
              <span>12% ce mois</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Stock</h3>
            <div className="icon green"><i className="fa-solid fa-boxes-stacked"></i></div>
          </div>
          <div className="stat-footer">
            <div>
              <p className="stat-value">
                {produits.reduce((total, p) => total + Number(p.stock), 0)}
              </p>
              <p>Total</p>
            </div>
            <div className="trend up">
              <i className="fas fa-arrow-up"></i> 5% ce mois
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Stock Faible</h3>
            <div className="icon red"><i className="fas fa-exclamation-triangle"></i></div>
          </div>
          <div className="stat-footer">
            <div>
              <p className="stat-value">
                {produits.filter(p => Number(p.stock) < 5).length}
              </p>
              <p>Produits en alerte</p>
            </div>
            <div className="trend down">
              <i className="fas fa-arrow-up"></i> 3 nouveaux
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h2>Produits</h2>
          <p>Gérez vos produits facilement</p>
        </div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((product) => (
                <tr key={product.id}>
                  <td>{product.nom}</td>
                  <td>{getCategoryName(product.categorie_id)}</td>
                  <td>{product.prix} Dhs</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setFormData({
                          nom: product.nom,
                          categorie_id: String(product.categorie_id),
                          prix: product.prix,
                          stock: product.stock,
                          description: product.description
                        });
                        setIsEditing(true);
                        setEditId(product.id);
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-delete" onClick={() => supprimerProduit(product.id)}>
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de formulaire */}
      {showModal && (
        <div id="formulaire" className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal-box">
              <form onSubmit={enregistrer} className="form-container">
                <div className="form-grid">
                  <div>
                    <label htmlFor="nom" className="label">Nom du Produit</label>
                    <input
                      type="text"
                      id="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="categorie_id" className="label">Catégorie</label>
                    <select
                      id="categorie_id"
                      value={formData.categorie_id}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">-- Sélectionnez --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="prix" className="label">Prix (Dhs)</label>
                    <input
                      type="number"
                      id="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="stock" className="label">Stock</label>
                    <input
                      type="number"
                      id="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                  <div className="full-width">
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="input"
                    />
                  </div>
                </div>
                <div className="button-group">
                  <button type="button" onClick={toggleAddModal} className="btn-cancel">Annuler</button>
                  <button type="submit" className="btn-save">Sauvegarder</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
