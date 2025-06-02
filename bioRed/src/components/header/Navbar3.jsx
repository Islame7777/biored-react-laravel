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
import { Stack } from '@mui/material';


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

        
        </Menu>
      </Box>

      <IconButton onClick={toggleDrawer('right', true)}>
        <MenuIcon sx={{color: '#000'}}/>
      </IconButton>

      <Drawer
  anchor="right"
  open={state['right']}
  onClose={toggleDrawer('right', false)}
  sx={{ '.MuiDrawer-paper': { width: '300px', p: 2 } }}
>
  <Box display="flex" flexDirection="column" height="100%">
    {/* En-tête */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6" fontWeight="bold">Menu</Typography>
      <IconButton onClick={toggleDrawer('right', false)}>
        <MenuIcon />
      </IconButton>
    </Box>

    {/* Navigation */}
    <Box mb={3}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Navigation
      </Typography>
      <Stack spacing={1}>
        <Button component={Link} to="/home" variant="outlined" fullWidth>🏠 Accueil</Button>
        <Button component={Link} to="/product" variant="outlined" fullWidth>🛍️ Produits</Button>
        <Button component={Link} to="/promotion" variant="outlined" fullWidth>🔥 Promotions</Button>
 
      </Stack>
    </Box>

    {/* Promo */}
    <Box bgcolor="#f5f5f5" borderRadius={2} p={2} mb={3}>
      <Typography fontWeight="bold">🎉 Code Promo</Typography>
      <Typography variant="body2">Utilisez <strong>ÉTÉ2025</strong> pour -15%</Typography>
    </Box>

    {/* Infos contact */}
    <Box>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>Support</Typography>
      <Typography variant="body2">📞 06 00 00 00 00</Typography>
      <Typography variant="body2">📧 support@exemple.com</Typography>
      <Typography variant="body2" mt={1}>Lun - Ven : 9h - 18h</Typography>
    </Box>

 
  </Box>
</Drawer>



    </Container>
  );
}

export default Navbar3;
