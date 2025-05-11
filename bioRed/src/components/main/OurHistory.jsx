import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

function OurHistory() {
  return (
    <Box sx={{ mt: 4, py: 6, backgroundColor: '#f9f9f9' }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Notre Histoire
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ fontSize: 18, color: '#555' }}>
          Depuis notre fondation, nous avons traversé une incroyable aventure. Partis d'une petite entreprise
          avec de grands rêves, nous avons construit une réputation basée sur la passion, l'innovation et la satisfaction
          de nos clients. Découvrez comment nous avons évolué pour devenir un leader dans le domaine de la location de voitures.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {/* Premier card - Début de l'histoire */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" align="center" color="primary">
                  Nos Débuts
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Notre histoire a commencé il y a une dizaine d'années dans une petite ville. À l'époque, nous n'avions que
                  quelques voitures et un petit bureau. Cependant, notre détermination à offrir une expérience de location
                  différente et de qualité nous a permis de dépasser nos premiers obstacles. Grâce à un service attentionné
                  et personnalisé, nos premiers clients sont devenus des ambassadeurs fidèles.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Deuxième card - Nos valeurs */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" align="center" color="primary">
                  Nos Valeurs
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Nos valeurs sont simples, mais essentielles : confiance, transparence et respect des engagements. Nous nous
                  efforçons de traiter chaque client avec soin et de garantir que chaque véhicule que nous proposons soit
                  en parfait état. L'honnêteté est au cœur de nos relations avec nos clients, et cela se reflète dans chaque
                  aspect de notre service.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Troisième card - La croissance */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6" align="center" color="primary">
                  Notre Croissance
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Grâce à l'engagement de notre équipe et à la confiance de nos clients, nous avons vu notre entreprise
                  croître rapidement. Nous avons élargi notre flotte de voitures et ouvert plusieurs agences dans des villes
                  stratégiques. Aujourd'hui, nous proposons des services de location pour tous types de véhicules, des voitures
                  compactes aux véhicules de luxe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" paragraph>
            Nous sommes fiers de notre parcours et de l'impact que nous avons eu sur nos clients. Mais nous savons que
            notre aventure ne fait que commencer.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }} className='d'>
            Découvrez Notre Parcours
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default OurHistory;
