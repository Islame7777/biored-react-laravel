import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Card, CardMedia, CardContent, CardActions,
  TextField, FormControl, InputLabel, Select, MenuItem, Box,
  CircularProgress, Chip, Grid
} from '@mui/material';

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('nom');

  const getCategoryName = (id) => categories[id] || 'Chargement...';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        const data = await res.json();
        const catObj = {};
        data.forEach(c => { catObj[c.id] = c.name; });
        setCategories(catObj);
      } catch (err) {
        setError('Erreur chargement catégories : ' + err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/produits');
        const data = await res.json();
        console.log("Produits récupérés depuis l'API :", data); // ✅ AJOUT ICI
        setProducts(data.filter(p => p.categorie_id !== 12));
      } catch (err) {
        setError('Erreur chargement produits : ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(filter.toLowerCase()) ||
    getCategoryName(product.categorie_id).toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'prix-asc') return a.prix - b.prix;
    if (sortBy === 'prix-desc') return b.prix - a.prix;
    return a.nom.localeCompare(b.nom);
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
        Catalogue des Produits
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2 }}>
        <TextField
          label="Rechercher"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Trier par</InputLabel>
          <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <MenuItem value="nom">Nom (A-Z)</MenuItem>
            <MenuItem value="prix-asc">Prix croissant</MenuItem>
            <MenuItem value="prix-desc">Prix décroissant</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredProducts.length} produit(s) trouvé(s)
      </Typography>

      <Grid container spacing={2}>
        {sortedProducts.map(product => {
          const imageUrl = product.image?.startsWith('http')
            ? product.image
            : `http://localhost:8000${product.image}`;

          return (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
  component="img"
  image={imageUrl || 'https://via.placeholder.com/200'}
  alt={product.nom}
  sx={{
    height: 200,
    objectFit: 'contain', // ou 'cover' si tu veux remplir le cadre sans laisser de vide
    backgroundColor: '#f5f5f5' // optionnel : pour un fond neutre
  }}
/>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.nom}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getCategoryName(product.categorie_id)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography fontWeight="bold">{product.prix.toFixed(2)} $</Typography>
                    <Chip
                      label={product.stock > 0 ? `En stock (${product.stock})` : 'Épuisé'}
                      color={product.stock > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.prix}
                    data-item-url="/"
                    data-item-description={product.description || product.nom}
                    data-item-name={product.nom}
                    data-item-image={imageUrl || 'https://via.placeholder.com/200'}
                    disabled={product.stock <= 0}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontWeight: 'bold',
                      backgroundColor: product.stock > 0 ? '#9f9c62' : '#ccc',
                      color: '#32342d',
                      border: 'none',
                      cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                      borderRadius: '4px',
                    }}
                  >
                    Ajouter au panier
                  </button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
