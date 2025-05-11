import { useState, useEffect, useContext } from 'react';
import React from 'react';

import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Chip,
  Grid,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Vous pouvez créer un contexte pour le panier
const CartContext = React.createContext();

// Hook personnalisé pour utiliser le contexte du panier
export function useCart() {
  return useContext(CartContext);
}

// Fournisseur du contexte de panier
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Vérifier si le produit est déjà dans le panier
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Mettre à jour la quantité si le produit existe déjà
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Ajouter le nouveau produit avec la quantité
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    return true; // Succès
  };
  
  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };
  
  // Calculer le total du panier
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.prix * item.quantity), 0);
  };
  
  // Obtenir le nombre total d'articles dans le panier
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Composant Alert personnalisé
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  
  // Si vous utilisez le contexte du panier
  // const { addToCart } = useCart();
  
  // Pour l'exemple, nous utiliserons un panier local si le contexte n'est pas disponible
  const [cart, setCart] = useState([]);
  
  // Fonction d'ajout au panier
  const handleAddToCart = (product) => {
    try {
      // Si vous utilisez le contexte
      // const success = addToCart(product);
      
      // Sinon, implémentation locale
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id);
        
        if (existingItem) {
          return prevCart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      
      // Afficher la notification de succès
      setNotification({
        open: true,
        message: `${product.nom} ajouté au panier!`,
        type: 'success'
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      setNotification({
        open: true,
        message: `Erreur: Impossible d'ajouter ${product.nom} au panier.`,
        type: 'error'
      });
    }
  };
  
  // Fermer la notification
  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/produits');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Filtrer les produits selon vos critères
        const filtered = data.filter(prod => prod.type !== 'pack' && prod.categorie_id === 12);
        setProducts(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setError(error.message || "Une erreur s'est produite");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filtrer les produits en fonction de la recherche
  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(filter.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(filter.toLowerCase()))
  );

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'prix-asc') return a.prix - b.prix;
    if (sortBy === 'prix-desc') return b.prix - a.prix;
    if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
    return 0;
  });

  // Affichage pendant le chargement
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Chargement des produits...</Typography>
      </Box>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="error" variant="h6" sx={{ mb: 2 }}>
            Erreur lors du chargement des produits: {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Réessayer
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Catalogue de Produits
      </Typography>

      {/* Informations du panier (optionnel) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Chip
          icon={<ShoppingCartIcon />}
          label={`${cart.length} article(s)`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Filtres et tri */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'space-between' }}>
        <TextField
          label="Rechercher des produits"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: { md: 300 } }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Trier par</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Trier par"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="nom">Nom (A-Z)</MenuItem>
            <MenuItem value="prix-asc">Prix (croissant)</MenuItem>
            <MenuItem value="prix-desc">Prix (décroissant)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Nombre de produits trouvés */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredProducts.length} produit(s) trouvé(s)
      </Typography>

      {/* Grille des produits */}
      {sortedProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 6 }}>
          <Typography>Aucun produit ne correspond à votre recherche.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {sortedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                transition: 'all 0.3s ease',
                '&:hover': { 
                  boxShadow: 6,
                  transform: 'translateY(-5px)'
                } 
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || 'https://via.placeholder.com/300x200'}
                  alt={product.nom}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Catégorie: {product.categorie_id || 'Inconnue'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" component="p" fontWeight="bold">
                      {typeof product.prix === 'number' ? `${product.prix.toFixed(2)} €` : `${product.prix} €`}
                    </Typography>
                    <Chip
                      label={product.stock > 0 ? `En stock (${product.stock})` : 'Épuisé'}
                      color={product.stock > 0 ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                    sx={{
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: product.stock > 0 ? 'primary.dark' : 'inherit',
                      }
                    }}
                  >
                    Ajouter au panier
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Notification d'ajout au panier */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.type} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}