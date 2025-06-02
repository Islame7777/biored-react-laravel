import React, { useState, useEffect } from 'react';
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

// ========== STYLES ==========
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

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

// ========== COMPONENT ==========
function Navbar2() {
  const [anchorElCategories, setAnchorElCategories] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const navigate = useNavigate();

  // 🔄 Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Erreur chargement des catégories', error);
      }
    };
    fetchCategories();
  }, []);

  // 🔍 Filtrage
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menu actions
  const handleClickCategories = (event) => {
    setAnchorElCategories(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setAnchorElCategories(null);
    setSearchQuery('');
  };

  const handleMenuItemClick = (name) => {
    setSelectedCategory(name);
    setAnchorElCategories(null);
    setSearchQuery('');

    const path = name === 'All Categories'
      ? '/product'
      : `/product/${name.toLowerCase()}`;
    navigate(path);
  };

  return (
    <Box sx={{ bgcolor: '#CFB284', py: 1 }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          <ShoppingCartOutlined />
          <Typography variant="body2" fontWeight="bold">E-commerce</Typography>
        </Stack>

        {/* Recherche + Catégories */}
        <Search sx={{ borderRadius: "22px", justifyContent: 'space-between' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher une catégorie…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
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
            {selectedCategory}
          </Button>

          <Menu
            id="categories-menu"
            anchorEl={anchorElCategories}
            open={Boolean(anchorElCategories)}
            onClose={handleCloseCategories}
            MenuListProps={{ 'aria-labelledby': 'categories-button' }}
          >
            <MenuItem onClick={() => handleMenuItemClick('All Categories')}>
              All Categories
            </MenuItem>
            {filteredCategories.map((cat) => (
              <MenuItem key={cat.id} onClick={() => handleMenuItemClick(cat.name)}>
                {cat.name}
              </MenuItem>
            ))}
          </Menu>
        </Search>

        {/* Profile + Panier */}
        <Stack direction="row" spacing={2}>
          {/* Profile */}
          <IconButton
            onClick={(e) => setAnchorElProfile(e.currentTarget)}
            sx={{ color: 'inherit' }}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={() => setAnchorElProfile(null)}
          >
            <MenuItem onClick={() => navigate('/')}>
              Se deconnecter
            </MenuItem>
          </Menu>

          {/* Panier Snipcart */}
          <IconButton className="snipcart-checkout">
            <StyledBadge color="primary">
              <ShoppingCartIcon sx={{ color: '#000' }} />
            </StyledBadge>
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar2;
