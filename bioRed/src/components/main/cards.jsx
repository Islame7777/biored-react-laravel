import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid,
  Card, CardMedia, CardContent, CardActions, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopPacks() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);

  // Récupérer les catégories
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
        const packs = data.filter(p => p.categorie_id !== 12);
        setProduct(packs.slice(0, 4)); 
      } catch (err) {
        setError('Erreur chargement produits : ' + err.message);
      }
    };
    fetchProducts();
  }, []);
  

  return (
    <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
      <Container>
      <Box sx={{ marginTop: '-80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        TOP DES VENTES
      </Typography>
    </Box>
        <Grid container spacing={3} justifyContent="center">
          {product.map((product) => {
            const imageUrl = product.image?.startsWith('http')
              ? product.image
              : `http://localhost:8000${product.image}`;

            return (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  minHeight: 350
                }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={imageUrl || '/default.jpg'}
                    alt={product.nom}
                    sx={{
                      objectFit: 'contain',
                      width: '100%',
                      backgroundColor: '#f9f9f9'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{product.nom}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {product.description || 'Pas de description fournie'}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                      {product.prix} $
                    </Typography>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button className='d'
          variant="outlined"
          onClick={() => {
            navigate('/product');
            window.scrollTo(0, 0);
          }}
        >
          Voir tous
        </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default TopPacks;
