import React, { useState, useEffect } from 'react';
import './commande.css';

export default function Commande() {
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]); // Nouveau state pour les clients
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    montant: '',
    statut: 'En attente',
    client_id: '', // Nouveau champ pour l'ID du client
  });

  useEffect(() => {
    // Récupérer les commandes
    fetch('http://localhost:8000/api/commande')
      .then(res => res.json())
      .then(data => setCommandes(data))
      .catch(err => console.error('Erreur chargement des commandes :', err));

    // Récupérer les clients
    fetch('http://localhost:8000/api/client')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error('Erreur chargement des clients :', err));
  }, []);

  const toggleModal = (commande = null) => {
    setShowModal(!showModal);
    if (commande) {
      setEditingId(commande.id);
      setFormData({
        date: commande.date,
        montant: commande.montant,
        statut: commande.statut,
        client_id: commande.client_id, // Associer le client lors de l'édition
      });
    } else {
      setEditingId(null);
      setFormData({
        date: '',
        montant: '',
        statut: 'En attente',
        client_id: '', // Réinitialiser le client
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://localhost:8000/api/commande/${editingId}`
      : 'http://localhost:8000/api/commande';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (editingId) {
          setCommandes(commandes.map(c => (c.id === editingId ? data : c)));
        } else {
          setCommandes([...commandes, data]);
        }
        toggleModal();
      } else {
        alert('Erreur : ' + (data.message || 'Échec de l’opération.'));
      }
    } catch (err) {
      console.error('Erreur lors de l’enregistrement :', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette commande ?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/api/commande/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCommandes(commandes.filter(c => c.id !== id));
      } else {
        alert("Échec de la suppression");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="container">
      <header className="admin-header">
        <h1 className="header-title">Commandes</h1>
        <p className="header-subtitle">Liste des commandes enregistrées</p>
        <div className="header-actions">
          <button onClick={() => toggleModal()} className="btn-add">
            <i className="fas fa-plus"></i> <span>Ajouter Commande</span>
          </button>
        </div>
      </header>

      <div className="table-wrapper">
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Client</th> {/* Nouvelle colonne pour le client */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commandes.length > 0 ? (
              commandes.map(cmd => (
                <tr key={cmd.id}>
                  <td>{cmd.id}</td>
                  <td>{cmd.date || '---'}</td>
                  <td>{cmd.montant} MAD</td>
                  <td>{cmd.statut}</td>
                  <td>{cmd.client?.nom || '---'}</td> {/* Affichage du nom du client */}
                  <td>
                    <button className="btn-edit" onClick={() => toggleModal(cmd)}>Modifier</button>
                    <button className="btn-delete" onClick={() => handleDelete(cmd.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="no-data">Aucune commande disponible</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="date">Date de commande</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="montant">Montant</label>
                <input
                  type="number"
                  id="montant"
                  value={formData.montant}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="statut">Statut</label>
                <select
                  id="statut"
                  value={formData.statut}
                  onChange={handleChange}
                >
                  <option value="En attente">En attente</option>
                  <option value="Expédiée">Expédiée</option>
                  <option value="Livrée">Livrée</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="client_id">Client</label>
                <select
                  id="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => toggleModal()}>Annuler</button>
                <button type="submit" className="btn-save">
                  {editingId ? 'Mettre à jour' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
