import React, { useState } from 'react';
import {
  Box, IconButton, Stack, Container, Typography,
  InputBase, Badge, Button, Menu, MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandMore, ShoppingCartOutlined, Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon, Search as SearchIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// ======================
// STYLES
// ======================
const Search = styled('div')(({ theme }) => ({
  flexGrow: 0.2,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #777',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// ======================
// COMPOSANT NAVBAR
// ======================
function Navbar2() {
  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  const options = [
    'All Categories',
    'parfums',
    'soins',
    'gommages',
    'bougies',
    'coffrets',
    'accessoires',
    'brumes'
  ];

  // CATEGORIES
  const handleClickCategories = (event) => {
    setAnchorElCategories(event.currentTarget);
  };
  const handleCloseCategories = () => {
    setAnchorElCategories(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorElCategories(null);

    const category = options[index];
    const path = category === 'All Categories'
      ? '/product'
      : `/product/${category.toLowerCase()}`;
    navigate(path);
  };

  // PROFILE
  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  // CART
  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  // NAVIGATION
  const handleNavigate = (path) => {
    handleCloseProfile();
    navigate(path);
  };

  return (
    <Box sx={{ bgcolor: '#CFB284', py: 1 }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <ShoppingCartOutlined />
          <Typography variant="body2" fontWeight="bold">E-commerce</Typography>
        </Stack>

        <Search sx={{ borderRadius: "22px", justifyContent: 'space-between' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          <Button
            id="categories-button"
            aria-controls={Boolean(anchorElCategories) ? 'categories-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorElCategories) ? 'true' : undefined}
            onClick={handleClickCategories}
            sx={{
              bgcolor: '#ceb792',
              borderTopRightRadius: '22px',
              borderBottomRightRadius: '22px',
              height: '100%',
              color: 'black',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#b89e79',
              },
            }}
            endIcon={<ExpandMore />}
          >
            {options[selectedIndex]}
          </Button>

          <Menu
            id="categories-menu"
            anchorEl={anchorElCategories}
            open={Boolean(anchorElCategories)}
            onClose={handleCloseCategories}
            MenuListProps={{
              'aria-labelledby': 'categories-button',
              role: 'listbox',
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Search>

        <Stack direction="row" spacing={2}>
          {/* Profile */}
          <IconButton
            onClick={handleClickProfile}
            aria-controls="profile-menu"
            aria-haspopup="true"
            sx={{ color: 'inherit' }}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleCloseProfile}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleNavigate('/seconnecter')}>
              Se connecter
            </MenuItem>
          </Menu>

          {/* Cart */}
          <IconButton aria-label="cart" onClick={handleClickCart}>
            <StyledBadge badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Menu
            id="cart-menu"
            anchorEl={anchorElCart}
            open={Boolean(anchorElCart)}
            onClose={handleCloseCart}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>Votre panier est vide</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar2;
