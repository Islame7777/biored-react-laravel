import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton,
  Stack,
  Button
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PaymentIcon from '@mui/icons-material/Payment';


function Footer() {
  return (
    <Box sx={{ 
      backgroundColor: '#CFB284',
      color: '#262626', 
      py: 3,
    }}>
      <Container maxWidth="lg">
        {/* Section des avantages */}
        <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6} sm={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShippingOutlinedIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Livraison offerte dès 50€
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityOutlinedIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Paiement 100% sécurisé
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ mt: { xs: 1, sm: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SupportAgentOutlinedIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Service client 6j/7
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3} sx={{ mt: { xs: 1, sm: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PaymentIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Satisfait ou remboursé
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Section principale */}
        <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ 
      fontWeight: 600, 
      color: '#262626',
      mb: 1
    }}>
      BioRed
    </Typography>
    <Typography variant="body2" sx={{ fontSize: '0.85rem', mb: 2 }}>
      Chez BioRed, nous croyons que la beauté authentique vient de la nature. 
      Nos cosmétiques bio d'exception sont soigneusement élaborés avec des ingrédients naturels et durables, 
      pour révéler l'éclat de votre peau tout en respectant l'environnement. 
      Offrez-vous une expérience de soin pure, saine et éthique.
    </Typography>

    {/* Ajout de la catégorie sous la description */}
    <Typography variant="subtitle2" sx={{ color: '#262626', mb: 1.5, fontWeight: 600 }}>
      Catégories
    </Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Link href="/visage" underline="none" color="inherit" sx={{
        '&:hover': { color: '#262626' },
        fontSize: '0.8rem'
      }}>
        Soins visage
      </Link>
      <Link href="/corps" underline="none" color="inherit" sx={{
        '&:hover': { color: '#262626' },
        fontSize: '0.8rem'
      }}>
        Soins corps
      </Link>
      <Link href="/cheveux" underline="none" color="inherit" sx={{
        '&:hover': { color: '#262626' },
        fontSize: '0.8rem'
      }}>
        Soins cheveux
      </Link>
      <Link href="/maquillage" underline="none" color="inherit" sx={{
        '&:hover': { color: '#262626' },
        fontSize: '0.8rem'
      }}>
        Maquillage bio
      </Link>
    </Stack>
  </Box>
</Grid>



          {/* Colonne Information */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: '#262626', mb: 1.5, fontWeight: 600 }}>
              Informations
            </Typography>
            <Stack spacing={0.5}>
              <Link href="/a-propos" underline="none" color="inherit" sx={{ 
                '&:hover': { color: '#262626' },
                fontSize: '0.85rem'
              }}>
                À propos
              </Link>
              <Link href="/livraison" underline="none" color="inherit" sx={{ 
                '&:hover': { color: '#262626' },
                fontSize: '0.85rem'
              }}>
                Livraison
              </Link>
              <Link href="/paiement" underline="none" color="inherit" sx={{ 
                '&:hover': { color: '#262626' },
                fontSize: '0.85rem'
              }}>
                Méthodes de paiement
              </Link>
              <Link href="/faq" underline="none" color="inherit" sx={{ 
                '&:hover': { color: '#262626' },
                fontSize: '0.85rem'
              }}>
                FAQ
              </Link>
              <Link href="/contact" underline="none" color="inherit" sx={{ 
                '&:hover': { color: '#262626' },
                fontSize: '0.85rem'
              }}>
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Colonne Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#262626', mb: 1.5, fontWeight: 600 }}>
              Contactez-nous
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontSize: '0.85rem', mb: 1 }}>
                Pour toute question sur nos produits ou votre commande, notre équipe est à votre disposition.
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.3)', 
                  color: '#262626',
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: '#262626',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Nous contacter
              </Button>
            </Box>

            <Typography variant="subtitle2" sx={{ color: '#262626', mb: 1, fontWeight: 600, mt: 1 }}>
              Suivez-nous
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" aria-label="facebook" sx={{ 
                color: '#262626', 
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="instagram" sx={{ 
                color: '#262626', 
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="twitter" sx={{ 
                color: '#262626', 
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="linkedin" sx={{ 
                color: '#262626', 
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" aria-label="youtube" sx={{ 
                color: '#262626', 
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}>
                <YouTubeIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        {/* Section du bas */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'center' },
        }}>
          <Typography variant="caption" color="#262626">
            © {new Date().getFullYear()} BioRed Cosmétiques Bio. Tous droits réservés.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: { xs: 1, sm: 0 } 
          }}>
            <Link href="/confidentialite" underline="none" sx={{ color: '#262626', fontSize: '0.75rem' }}>
              Confidentialité
            </Link>
            <Link href="/conditions" underline="none" sx={{ color: '#262626', fontSize: '0.75rem' }}>
              Conditions
            </Link>
            <Link href="/mentions-legales" underline="none" sx={{ color: '#262626', fontSize: '0.75rem' }}>
              Mentions légales
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;