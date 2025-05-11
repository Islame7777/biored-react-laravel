import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Chip
} from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function GiftListingPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler les données cadeaux (à remplacer par une vraie API)
    const timer = setTimeout(() => {
      const dummyGifts = [
        { id: 1, name: 'Montre de luxe', price: 250, category: 'Accessoires', stock: 5, image: 'https://via.placeholder.com/300x200' },
        { id: 2, name: 'Coffret parfum', price: 99, category: 'Beauté', stock: 8, image: 'https://via.placeholder.com/300x200' },
        { id: 3, name: 'Panier gourmand', price: 60, category: 'Gastronomie', stock: 10, image: 'https://via.placeholder.com/300x200' },
        { id: 4, name: 'Écharpe en cachemire', price: 45, category: 'Mode', stock: 12, image: 'https://via.placeholder.com/300x200' },
      ];
      setGifts(dummyGifts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addToGiftCart = (gift) => {
    alert(`${gift.name} ajouté à votre liste de cadeaux !`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des cadeaux...</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Cadeaux 🎁
      </Typography>

      <Grid container spacing={3}>
        {gifts.map(gift => (
          <Grid item xs={12} sm={6} md={4} key={gift.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardMedia
                component="img"
                height="200"
                image={gift.image}
                alt={gift.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {gift.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Catégorie: {gift.category}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {gift.price} €
                  </Typography>
                  <Chip
                    label={gift.stock > 0 ? `En stock (${gift.stock})` : 'Épuisé'}
                    color={gift.stock > 0 ? 'primary' : 'error'}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CardGiftcardIcon />}
                  onClick={() => addToGiftCart(gift)}
                  disabled={gift.stock <= 0} className='d'
                >
                  Offrir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
