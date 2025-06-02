import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardMedia, CardContent,
  CardActions, Chip, Box, CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ProductFilteredPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCategoryName = (id) => categories[id] || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        const data = await res.json();
        const catMap = {};
        data.forEach(c => { catMap[c.id] = c.name; });
        setCategories(catMap);
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

        const matchingCategoryId = Object.entries(categories).find(
          ([, name]) => name && name.toLowerCase() === slug.toLowerCase()
        )?.[0];

        if (matchingCategoryId) {
          const filtered = data.filter(p => p.categorie_id == matchingCategoryId);
          setProducts(filtered);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError('Erreur chargement produits : ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(categories).length > 0) {
      fetchProducts();
    }
  }, [slug, categories]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
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
      <Typography variant="h4" gutterBottom>
        Produits dans la catégorie : "{slug}"
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {products.length} produit(s) trouvé(s)
      </Typography>

      <Grid container spacing={2}>
        {products.map(product => {
          const imageUrl = product.image?.startsWith('http')
            ? product.image
            : `http://localhost:8000${product.image}`;

          return (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={imageUrl || 'https://via.placeholder.com/200'}
                  alt={product.nom}
                  sx={{ objectFit: 'contain', backgroundColor: '#f9f9f9' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.nom}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getCategoryName(product.categorie_id)}
                  </Typography>
                  <Typography fontWeight="bold" mt={1}>
                    {product.prix.toFixed(2)} $
                  </Typography>
                  <Chip
                    label={product.stock > 0 ? `En stock (${product.stock})` : 'Épuisé'}
                    color={product.stock > 0 ? 'success' : 'error'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.prix}
                    data-item-url="/"
                    data-item-description={product.description || product.nom}
                    data-item-name={product.nom}
                    data-item-image={imageUrl}
                    disabled={product.stock <= 0}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontWeight: 'bold',
                      backgroundColor: product.stock > 0 ? '#1976d2' : '#ccc',
                      color: '#fff',
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
