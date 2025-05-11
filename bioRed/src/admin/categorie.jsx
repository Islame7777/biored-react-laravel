import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './categorie.css';

export default function Categories() {
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [showModal, setShowModal] = useState(false); // Affichage du modal
  const [formData, setFormData] = useState({
    name: '',
    status: 'Actif',
    description: ''
  }); // Données du formulaire
  const [isEditing, setIsEditing] = useState(false); // Pour savoir si on édite une catégorie existante
  const [editId, setEditId] = useState(null); // ID de la catégorie à éditer

  // Charger les catégories depuis Laravel au chargement du composant
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(response => {
        setCategories(response.data); // Mettre à jour la liste des catégories
      })
      .catch(error => {
        console.error("Erreur de chargement :", error); // Gestion des erreurs
      });
  }, []);

  // Toggle pour ouvrir ou fermer le modal
  const toggleAddModal = () => {
    setShowModal(!showModal);
    setFormData({
      name: '',
      status: 'Actif',
      description: ''
    });
    setIsEditing(false); // Réinitialisation de l'état d'édition
  };

  // Gestion de l'entrée des champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Soumettre le formulaire pour ajouter ou modifier une catégorie
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleAddModal();

    if (!formData.name.trim()) {
      alert('Le nom est requis.'); // Validation du nom
      return;
    }

    if (isEditing) {
      // Modifier une catégorie existante
      axios.put(`http://127.0.0.1:8000/api/categories/${editId}`, formData)
        .then(res => {
          console.log("Réponse après modification :", res.data);
          setCategories(categories.map(cat => (cat.id === editId ? res.data : cat)));
          toggleAddModal();
        })
        .catch(err => {
          console.error("Erreur de modification :", err);
        });
    } else {
      // Ajouter une nouvelle catégorie
      axios.post('http://127.0.0.1:8000/api/categories', formData)
        .then(res => {
          console.log("Réponse après ajout :", res.data);
          setCategories(prevCategories => [...prevCategories, res.data]);
          toggleAddModal();
        })
        .catch(err => {
          console.error("Erreur d'enregistrement :", err);
        });
    }
  };

  // Fonction pour supprimer une catégorie
  const supprimerProduit = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(cat => cat.id !== id)); // Retirer la catégorie supprimée de la liste
      })
      .catch(err => {
        console.error("Erreur de suppression :", err);
      });
  };

  return (
    <div className="container">
      <header className="admin-header">
        <div>
          <h1 className="header-title">Catégories</h1>
          <p className="header-subtitle">Bienvenue dans votre espace administrateur</p>
        </div>
        <div className="header-actions">
          <button onClick={toggleAddModal} className="btn-add">
            <i className="fas fa-plus"></i>
            <span>Nouvelle catégorie</span>
          </button>

        </div>
      </header>

      <div className="categorie-wrapper">
        <div className="categorie-header">
          <h2>Catégories</h2>
          <p>Voici vos catégories</p>
        </div>
        <div className="categorie-table-wrapper">
          <table className="categorie-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Actions</th> {/* Colonne pour les actions (éditer, supprimer) */}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>{cat.status}</td>
                  <td>
                    {/* Bouton Modifier */}
                    <button
                      className="btn-edit"
                      onClick={() => {
                        setFormData({
                          name: cat.name,
                          status: cat.status,
                          description: cat.description,
                        });
                        setIsEditing(true); // Passer en mode édition
                        setEditId(cat.id); // Sauvegarder l'ID de la catégorie à éditer
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>

                    {/* Bouton Supprimer */}
                    <button
                      className="btn-delete"
                      onClick={() => supprimerProduit(cat.id)}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="no-category">Aucune catégorie</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour ajouter ou modifier une catégorie */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nom de la Catégorie</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Statut</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={toggleAddModal}>Annuler</button>
                <button type="submit" className="btn-save" onClick={handleSubmit}>Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
