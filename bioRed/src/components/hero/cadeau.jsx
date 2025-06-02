import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardMedia,
  CardContent, CardActions, Button, Chip, Divider
} from '@mui/material';

export default function CadeauPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/produits');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur chargement produits", error);
      }
    };
    fetchProducts();
  }, []);

  const coffrets = products.filter(p => p.categorie_id === 6);
  const moinsDe100 = products.filter(p => p.prix < 100);
  const entre100et250 = products.filter(p => p.prix >= 100 && p.prix <= 250);
  const plusDe250 = products.filter(p => p.prix > 250);

  const renderProductCard = (product) => {
    const imageUrl = product.image?.startsWith('http')
      ? product.image
      : `http://localhost:8000${product.image}`;

    return (
      <Grid item xs={12} sm={6} md={3} key={product.id}>
        <Card
          elevation={4}
          sx={{
            height: '100%',
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)' }
          }}
        >
          <CardMedia
            component="img"
            height="180"
            image={imageUrl}
            alt={product.nom}
            sx={{ objectFit: 'contain', backgroundColor: '#fcfcfc' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {product.nom}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description || 'Un produit idéal à offrir.'}
            </Typography>
            <Typography variant="subtitle1" color="primary" fontWeight="bold" mt={1}>
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
              data-item-url="/cadeau"
              data-item-description={product.description || product.nom}
              data-item-name={product.nom}
              data-item-image={imageUrl}
              disabled={product.stock <= 0}
              style={{
                width: '100%',
                padding: '12px',
                fontWeight: 'bold',
                backgroundColor: product.stock > 0 ? '#CFB284' : '#ddd',
                color: '#000',
                border: 'none',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                borderRadius: '0 0 12px 12px',
              }}
            >
              🎁 Ajouter au panier
            </button>
          </CardActions>
        </Card>
      </Grid>
    );
  };

  return (
    <Container sx={{ py: 6 }}>
      {/* HEADER */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🎁 Offrez un moment de bonheur
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Coffrets élégants, cadeaux attentionnés et carte à offrir.
        </Typography>
      </Box>

      {/* COFFRETS */}
      <Divider textAlign="left" sx={{ my: 4 }}>
        <Typography variant="h5" fontWeight="bold">✨ Coffrets Cadeaux</Typography>
      </Divider>
      <Grid container spacing={3}>
        {coffrets.length ? coffrets.map(renderProductCard) : (
          <Typography>Aucun coffret trouvé.</Typography>
        )}
      </Grid>

      {/* PAR BUDGET */}
      <Divider textAlign="left" sx={{ my: 5 }}>
        <Typography variant="h5" fontWeight="bold">💰 Cadeaux par budget</Typography>
      </Divider>

      <Typography variant="subtitle1" fontWeight="bold" mt={3} mb={1}>Moins de 100 $</Typography>
      <Grid container spacing={3}>
        {moinsDe100.map(renderProductCard)}
      </Grid>

      <Typography variant="subtitle1" fontWeight="bold" mt={5} mb={1}>Entre 100 et 250 $</Typography>
      <Grid container spacing={3}>
        {entre100et250.map(renderProductCard)}
      </Grid>

      <Typography variant="subtitle1" fontWeight="bold" mt={5} mb={1}>Plus de 250 $</Typography>
      <Grid container spacing={3}>
        {plusDe250.map(renderProductCard)}
      </Grid>

      {/* CARTE CADEAU */}
      <Box
        mt={8}
        p={4}
        borderRadius={4}
        bgcolor="#f7f0e7"
        textAlign="center"
        boxShadow={2}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💌 Carte Cadeau Électronique
        </Typography>
        <Typography variant="body1" mb={2}>
          Laissez vos proches choisir eux-mêmes. Une solution simple et rapide à offrir !
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#CFB284',
            color: '#000',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            mt: 1
          }}
        >
          Offrir une carte cadeau
        </Button>
      </Box>
    </Container>
  );
}
