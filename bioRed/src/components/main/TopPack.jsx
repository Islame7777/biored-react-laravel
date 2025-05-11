import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid,
  Card, CardMedia, CardContent, CardActions, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TopPacks() {
  const [packs, setPacks] = useState([]);
  const navigate = useNavigate();

  // Récupérer les produits avec categorie_id = 12
  useEffect(() => {
    fetch('http://localhost:8000/api/produits')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(product => product.categorie_id === 12);
        setPacks(filtered.slice(0, 4)); // Affiche seulement les 4 premiers
      })
      .catch(error => console.error('Erreur de chargement des packs :', error));
  }, []);

  // Scroll en haut après rechargement
  useEffect(() => {
    if (window.performance) {
      const [navigation] = window.performance.getEntriesByType('navigation');
      if (navigation && navigation.type === 'reload') {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <Box sx={{ py: 6, backgroundColor: '#ffffff' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          🎁 Top des Packs
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Des offres adaptées à tous les styles de voyage.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {packs.map((pack) => (
            <Grid item xs={12} sm={6} md={3} key={pack.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, minHeight: 350 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={pack.image || '/default.jpg'} // Utilise une image par défaut si pack.image est null
                  alt={pack.nom}
                  sx={{ objectFit: 'contain', width: '90%', mx: 'auto', backgroundColor: '#f9f9f9' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{pack.nom}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {pack.description || 'Pas de description fournie'}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    {pack.prix} DH
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" className='d'>
                    Réserver
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          className='d'
          variant="outlined"
          color="primary"
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

export default TopPacks;
