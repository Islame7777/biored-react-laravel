import { useState, useEffect, useContext, createContext, forwardRef } from 'react';
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

// CONTEXTE PANIER
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    return true;
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.prix * item.quantity, 0);

  const getItemCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Alerte MUI
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// PAGE PRINCIPALE
export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('nom');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Utiliser le contexte du panier (erreur ici car CartProvider n'est pas rendu)
  // Pour que cette ligne ne cause pas d'erreur, le composant doit être enveloppé dans un CartProvider
  // Correction: créer un panier local si le contexte n'est pas disponible
  const cartContext = useContext(CartContext);
  const { addToCart = () => {}, cart = [] } = cartContext || {};

  const getCategoryName = (id) => {
    return categories[id] || 'Chargement...';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const response = await fetch('http://localhost:8000/api/categories');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Categories data received:', data);
        
        const catObj = {};
        data.forEach(c => {
          catObj[c.id] = c.name;
        });
        
        console.log('Categories mapped:', catObj);
        setCategories(catObj);
        setCategoriesLoaded(true);
      } catch (err) {
        console.error('Erreur chargement catégories:', err);
        setError('Impossible de charger les catégories: ' + err.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await fetch('http://localhost:8000/api/produits');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Products data received:', data);
        
        const filtered = data.filter(prod => prod.categorie_id !== 12);
        setProducts(filtered);
        setProductsLoaded(true);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Set loading to false only when both data fetches are complete
  useEffect(() => {
    if (categoriesLoaded && productsLoaded) {
      setLoading(false);
    }
  }, [categoriesLoaded, productsLoaded]);

  // Implémentation locale d'ajout au panier si le contexte n'est pas disponible
  const [localCart, setLocalCart] = useState([]);
  
  const handleAddToCart = (product) => {
    try {
      // Si le contexte de panier est disponible, utiliser sa fonction addToCart
      if (cartContext) {
        addToCart(product);
      } else {
        // Sinon, utiliser le panier local
        setLocalCart(prevCart => {
          const existing = prevCart.find(item => item.id === product.id);
          if (existing) {
            return prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      }
      
      setNotification({
        open: true,
        message: `${product.nom} ajouté au panier !`,
        type: 'success'
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier:", err);
      setNotification({
        open: true,
        message: `Erreur: impossible d'ajouter ${product.nom}`,
        type: 'error'
      });
    }
  };

  const handleCloseNotification = (_, reason) => {
    if (reason !== 'clickaway') {
      setNotification(prev => ({ ...prev, open: false }));
    }
  };

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
        <Typography sx={{ ml: 2 }}>Chargement des produits et catégories...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color="error" variant="h6">{error}</Typography>
          <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Réessayer</Button>
        </Box>
      </Container>
    );
  }

  // Utiliser le panier du contexte ou le panier local
  const displayCart = cartContext ? cart : localCart;
  const cartItemCount = displayCart.length;

  // Debug - afficher les catégories récupérées
  console.log('Rendering with categories:', categories);
  console.log('Category IDs in products:', products.map(p => p.categorie_id));

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
        Catalogue de Produits
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Chip
          icon={<ShoppingCartIcon />}
          label={`${cartItemCount} article(s)`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        mb: 4,
        justifyContent: 'space-between'
      }}>
        <TextField
          label="Rechercher"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          fullWidth
          sx={{ maxWidth: { md: 300 } }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-label">Trier par</InputLabel>
          <Select 
            labelId="sort-label"
            value={sortBy} 
            label="Trier par" 
            onChange={e => setSortBy(e.target.value)}
          >
            <MenuItem value="nom">Nom (A-Z)</MenuItem>
            <MenuItem value="prix-asc">Prix croissant</MenuItem>
            <MenuItem value="prix-desc">Prix décroissant</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredProducts.length} produit(s) trouvé(s)
      </Typography>

      {sortedProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 6 }}>
          <Typography>Aucun produit ne correspond à votre recherche.</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
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
                  image={product.image || 'https://via.placeholder.com/200'}
                  alt={product.nom}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{product.nom}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {getCategoryName(product.categorie_id)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" component="p" fontWeight="bold">
                      {typeof product.prix === 'number' ? `${product.prix.toFixed(2)} DH` : `${product.prix} DH`}
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
                    fullWidth 
                    variant="contained"
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