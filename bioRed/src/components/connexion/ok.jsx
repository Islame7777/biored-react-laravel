import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Rating,
  TextField, Toolbar, Typography, useTheme
} from '@mui/material';
import { Search, ShoppingCart, Person, Menu, ArrowForward, LockOutlined, Login } from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginReason, setLoginReason] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenLoginDialog = (reason) => {
    setLoginReason(reason);
    setLoginDialogOpen(true);
  };
  const handleCloseLoginDialog = () => setLoginDialogOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8000/api/produits');
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        const first4 = Array.isArray(data) ? data.slice(0, 4) : [];
        setFeaturedProducts(first4);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <CssBaseline />
      {/* Header */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            biored
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField 
              size="small"
              placeholder="Rechercher..."
              variant="outlined"
              InputProps={{
                endAdornment: <Search />
              }}
              sx={{ mr: 2, width: 250 }}
            />
            <IconButton color="inherit" aria-label="Profil">
              <Person />
            </IconButton>
            <IconButton color="inherit" aria-label="Panier">
              <ShoppingCart />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'grey.900',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(/api/placeholder/1600/500)',
          height: { xs: 300, md: 400 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(186, 41, 41, 0.65)',
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Typography component="h1" variant="h3" fontWeight="bold" gutterBottom>
            Des produits exceptionnels
          </Typography>
          <Typography variant="h6" paragraph>
            Découvrez notre sélection de produits haut de gamme à des prix imbattables.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowForward />} 
            size="large"
            onClick={() => handleOpenLoginDialog('offres')}
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            Voir les offres
          </Button>
        </Box>
      </Box>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" component="h2" sx={{ mb: 4 }}>
          Produits en vedette
        </Typography>

        {loading && (
          <Typography variant="body1" align="center" color="text.secondary">
            Chargement des produits...
          </Typography>
        )}

        {error && (
          <Typography variant="body1" align="center" color="error">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Grid container spacing={5}>
            {featuredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image || '/api/placeholder/400/250'}
                    alt={product.name || "Produit"}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 200, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                      {product.name || product.nom || 'Produit sans nom'}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {product.price || product.prix || 'Prix non dispo'}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Rating 
                        value={product.rating || 0} 
                        precision={0.1} 
                        readOnly 
                        size="small"
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.rating ? product.rating.toFixed(1) : '0.0'})
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      {product.description || 'Pas de description'}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={() => handleOpenLoginDialog('détails')}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Voir détails
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => {
                        // Logique d’ajout au panier ici
                        navigate('/');
                      }}
                      sx={{ textTransform: 'none', fontWeight: 600 }}
                    >
                      Ajouter au panier
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <LockOutlined />
            Connexion requise
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {loginReason === 'profil' && "Veuillez vous connecter pour accéder à votre profil."}
            {loginReason === 'panier' && "Veuillez vous connecter pour gérer votre panier d'achats."}
            {loginReason === 'offres' && "Veuillez vous connecter pour voir nos offres exclusives."}
            {loginReason === 'détails' && "Veuillez vous connecter pour voir les détails du produit."}
            {loginReason === 'newsletter' && "Veuillez vous connecter pour vous inscrire à notre newsletter."}
            {loginReason === 'catégorie' && "Veuillez vous connecter pour accéder à cette catégorie."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Adresse email"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', alignItems: 'stretch' }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            startIcon={<Login />}
            onClick={handleCloseLoginDialog}
            sx={{ mb: 1, fontWeight: 600, textTransform: 'none' }}
          >
            Se connecter
          </Button>
          <Button variant="text" color="primary" onClick={handleCloseLoginDialog} sx={{ textTransform: 'none' }}>
            Créer un compte
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                À propos
              </Typography>
              <Typography variant="body2" color="grey.300">
                MonMarché est votre destination pour des produits de qualité et un service client exceptionnel.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Liens utiles
              </Typography>
              <Typography variant="body2" display="block" gutterBottom color="grey.300" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Conditions d'utilisation
              </Typography>
              <Typography variant="body2" display="block" gutterBottom color="grey.300" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Politique de confidentialité
              </Typography>
              <Typography variant="body2" display="block" gutterBottom color="grey.300" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Livraison et retours
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact
              </Typography>
              <Typography variant="body2" display="block" gutterBottom color="grey.300">
                Email: contact@monmarche.fr
              </Typography>
              <Typography variant="body2" display="block" gutterBottom color="grey.300">
                Téléphone: +33 1 23 45 67 89
              </Typography>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Divider sx={{ bgcolor: 'grey.700', mb: 2 }} />
            <Typography variant="body2" align="center" color="grey.500">
              © {new Date().getFullYear()} MonMarché. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
