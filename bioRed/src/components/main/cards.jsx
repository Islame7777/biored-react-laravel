import React, { useEffect, useState } from 'react';
import './card.css';
import { Card, CardContent, Typography, CardMedia, Button, Grid, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductCards() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Récupérer les produits depuis l'API Laravel
  useEffect(() => {
    axios.get('http://localhost:8000/api/produits')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }, []);

  return (
    <Box sx={{ marginTop: '-80px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        TOP DES VENTES
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {products.slice(0, 4).map((product) => (

          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Si le champ image existe dans ton backend, utilise product.image, sinon un placeholder */}
              <CardMedia
                component="img"
                height="200"
                image={product.image || 'https://via.placeholder.com/300x200'}
                alt={product.nom}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{product.nom}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description || 'Aucun détail disponible.'}
                </Typography>
                <Typography variant="h6" color="primary" mb={2}>
                  {product.prix} DH
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/product/${product.id}`}
                >
                  Rent Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
    </Box>
  );
}

export default ProductCards;
