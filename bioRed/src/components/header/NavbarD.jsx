import React, { useState } from 'react';
import { Drawer, Box, Typography, Link, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import { Home, ShoppingCart, Category, LocalOffer, Person, Email } from '@mui/icons-material'; // Import icons

function NavbarD() {
  const [state, setState] = useState({ right: false });
  const theme = useTheme();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Drawer
      anchor={'right'}
      open={state['right']}
      onClose={toggleDrawer('right', false)}
      sx={{
        ".MuiPaper-root": {
          width: '70%',
          backgroundColor: theme.palette.background.default,
          boxShadow: 3,
        }
      }}
    >
      <Box sx={{ p: 3, backgroundColor: theme.palette.primary.main }}>
        <Typography variant="h6" color="white" gutterBottom>
          Menu
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link href="/" underline="none" color="inherit" display="flex" alignItems="center">
            <Home sx={{ mr: 2 }} /> Accueil
          </Link>
          <Link href="/produits" underline="none" color="inherit" display="flex" alignItems="center">
            <ShoppingCart sx={{ mr: 2 }} /> Produits
          </Link>
          <Link href="/categories" underline="none" color="inherit" display="flex" alignItems="center">
            <Category sx={{ mr: 2 }} /> Catégories
          </Link>
          <Link href="/promotions" underline="none" color="inherit" display="flex" alignItems="center">
            <LocalOffer sx={{ mr: 2 }} /> Promotions
          </Link>
          <Link href="/panier" underline="none" color="inherit" display="flex" alignItems="center">
            <ShoppingCart sx={{ mr: 2 }} /> Mon Panier
          </Link>
          <Link href="/compte" underline="none" color="inherit" display="flex" alignItems="center">
            <Person sx={{ mr: 2 }} /> Mon Compte
          </Link>
          <Link href="/contact" underline="none" color="inherit" display="flex" alignItems="center">
            <Email sx={{ mr: 2 }} /> Contact
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
}

export default NavbarD;
