import React, { useState, useEffect } from 'react';
import './compte.css';

export default function Compte() {
  const [comptes, setComptes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',  // Ajout de l'email
    password: '',
    role: 'Admin',
  });

  // Charger les comptes depuis Laravel API
  useEffect(() => {
    fetch('http://localhost:8000/api/compte')
      .then(res => res.json())
      .then(data => setComptes(data))
      .catch(err => console.error('Erreur lors du chargement :', err));
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
    setFormData({ id: '', username: '', email: '', password: '', role: 'Admin' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ajouter un utilisateur (POST)
    try {
      const response = await fetch('http://localhost:8000/api/compte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,  // Envoi de l'email
          password: formData.password,
          role: formData.role
        })
      });

      if (response.ok) {
        const newUser = await response.json();
        setComptes([...comptes, newUser]);  // Ajoute le nouvel utilisateur dans l'état
        toggleModal();
      } else {
        const error = await response.json();
        alert('Erreur : ' + (error.message || 'Échec de l’ajout.'));
      }
    } catch (err) {
      console.error('Erreur lors de l’ajout :', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/compte/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        setComptes(comptes.filter(acc => acc.id !== id));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (err) {
      console.error('Erreur suppression :', err);
    }
  };

  return (
    <div className="container">
      <header className="admin-header">
        <h1 className="header-title">Comptes utilisateurs</h1>
        <p className="header-subtitle">Gestion des utilisateurs</p>
        <div className="header-actions">
          <button onClick={toggleModal} className="btn-add">
            <i className="fas fa-plus"></i> <span>Nouveau compte</span>
          </button>
        </div>
      </header>

      <div className="table-wrapper">
        <table className="account-table">
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Email</th>  {/* Ajout de la colonne Email */}
              <th>Rôle</th>
              <th>Mot de passe</th>  {/* Ajout d'une colonne pour afficher le mot de passe sous forme masquée */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comptes.length > 0 ? (
              comptes.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.username}</td>
                  <td>{acc.email}</td>  {/* Affichage de l'email */}
                  <td>{acc.role}</td>
                  <td>{acc.password}</td>  {/* Masquer le mot de passe */}
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(acc.id)} >Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="no-data">Aucun compte</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>  {/* Ajout de l'input email */}
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Rôle</label>
                <select id="role" value={formData.role} onChange={handleChange}>
                  <option value="Admin">Admin</option>
                  <option value="Utilisateur">Utilisateur</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={toggleModal}>Annuler</button>
                <button type="submit" className="btn-save">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
