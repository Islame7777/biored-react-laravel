import React from 'react';
import { Box } from '@mui/material';
import Accueil from './../../images/ACCUEIL.jpg';

function ImageMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' ,
        marginTop: '-80px',
      }}
    >
    <img
  src={Accueil}
  alt="Main Image"
  
  style={{
    width: '100%', // Tu peux mettre 40%, 30%, 100% etc.
    height: '600px', 
      //  objectFit: 'cover'
   // petite longueur (hauteur)
    // borderRadius: '8px',
  }}
/>

    </Box>
  );
}

export default ImageMain;
