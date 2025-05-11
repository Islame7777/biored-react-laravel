import { Box, Container, Drawer, IconButton, ListItemIcon, ListItemText, Typography, Link as MuiLink } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import WindowIcon from '@mui/icons-material/Window';
import { Link } from 'react-router-dom'; // Import du vrai Link pour naviguer
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useTheme } from '@mui/material/styles'; // Import correct de useTheme
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function Navbar3() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const theme = useTheme(); // Utiliser le bon hook useTheme

  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
      <Button
  id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={handleClick}
  sx={{
    width: 222,
    backgroundColor: '#fff',    // Fond blanc
    color: '#000',              // Texte et icônes noirs
    '&:hover': {
      backgroundColor: '#f0f0f0' // Gris clair au survol
    }
  }}
>
  <WindowIcon sx={{color: '#000'}}/>
  <Typography
    sx={{
      padding: 0,
      textTransform: 'capitalize',
      mx: 1,
      color: '#000'
    }}
  >
    Catégorie
  </Typography>
  <Box flexGrow={1} />
  <KeyboardArrowRightOutlinedIcon sx={{ color: '#000' }} />
</Button>



        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ ".MuiPaper-root": { width: 200 } }}
        >
          <MenuItem component={Link} to="/product" onClick={handleClose}>
            <ListItemIcon>
              <ArrowCircleRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Produits</ListItemText>
          </MenuItem>

          <MenuItem component={Link} to="/promotion" onClick={handleClose}>
            <ListItemIcon>
              <ArrowCircleRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Promotion</ListItemText>
          </MenuItem>

          <MenuItem component={Link} to="/cadeau" onClick={handleClose}>
            <ListItemIcon>
              <ArrowCircleRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cadeau</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <IconButton onClick={toggleDrawer('right', true)}>
        <MenuIcon sx={{color: '#000'}}/>
      </IconButton>

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        sx={{ ".MuiPaper-root": { width: '50%' }}}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Menu
          </Typography>

          <MuiLink component={Link} to="/" underline="none" color="primary" display="block" mb={1}>
            Accueil
          </MuiLink>

          <MuiLink component={Link} to="/product" underline="none" color="primary" display="block" mb={1}>
            Produits
          </MuiLink>

          <MuiLink component={Link} to="/categories" underline="none" color="primary" display="block" mb={1}>
            Catégories
          </MuiLink>

          <MuiLink component={Link} to="/promotion" underline="none" color="primary" display="block" mb={1}>
            Promotions
          </MuiLink>

          <MuiLink component={Link} to="/panier" underline="none" color="primary" display="block" mb={1}>
            Mon Panier
          </MuiLink>

          <MuiLink component={Link} to="/compte" underline="none" color="primary" display="block" mb={1}>
            Mon Compte
          </MuiLink>

          <MuiLink component={Link} to="/contact" underline="none" color="primary" display="block">
            Contact
          </MuiLink>
        </Box>
      </Drawer>
    </Container>
  );
}

export default Navbar3;
