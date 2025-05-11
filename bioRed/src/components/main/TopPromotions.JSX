import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const promotions = [
  {
    id: 1,
    title: 'Location Citadine -50%',
    image: 'https://source.unsplash.com/featured/?car', // Remplace par ton propre lien d'image si tu veux
    description: 'Profitez de notre offre exceptionnelle sur les voitures citadines. Idéal pour vos déplacements en ville !',
    price: 'À partir de 150 DH/jour',
  },
  {
    id: 2,
    title: 'SUV à Prix Réduit',
    image: 'https://source.unsplash.com/featured/?suv',
    description: 'Roulez confortablement avec nos SUV en promotion. Offre valable pour une durée limitée.',
    price: 'À partir de 250 DH/jour',
  },
  {
    id: 3,
    title: 'Offre Week-End -30%',
    image: 'https://source.unsplash.com/featured/?roadtrip',
    description: 'Partez en escapade le week-end avec nos réductions sur les longs trajets.',
    price: 'Réduction sur 2 jours ou plus',
  },
];

function TopPromotions() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#fff8f0' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          🔥 Top des Promotions
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Ne manquez pas nos meilleures offres sur la location de voitures. Réservez maintenant et économisez !
        </Typography>

        <Grid container spacing={4}>
          {promotions.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={promo.image}
                  alt={promo.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {promo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {promo.description}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }} color="primary">
                    {promo.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" variant="contained">
                    Réserver
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TopPromotions;
