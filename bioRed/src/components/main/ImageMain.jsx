import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Image1 from './../../images/photo1.jpg';
import Image2 from './../../images/photo2.jpg';
import Image3 from './../../images/photo.png';

const images = [Image1, Image2, Image3];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef();

  // Défilement automatique
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const prevImage = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  // Gestion pause au survol
  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        height: { xs: 400, md: 650 },
        margin: 'auto',
        overflow: 'hidden',
        borderRadius: 6,
        boxShadow: 6,
        my: 4,
        background: '#111827',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* IMAGE PRINCIPALE */}
      <img
        src={images[currentIndex]}
        alt={`carousel main ${currentIndex + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: 'inherit',
          transition: 'opacity 0.45s cubic-bezier(.77,.03,.29,.98)',
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />

      {/* OVERLAY */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: 'linear-gradient(90deg,rgba(15,23,42,0.32) 0%,rgba(0,0,0,0) 12%,rgba(0,0,0,0) 88%,rgba(15,23,42,0.32) 100%)',
          zIndex: 2,
        }}
      />

      {/* Flèche gauche */}
      <IconButton
        onClick={prevImage}
        sx={{
          position: 'absolute',
          left: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.30)',
          '&:hover': { bgcolor: 'rgba(34,197,94,0.8)', color: '#fff' },
          boxShadow: 2,
          zIndex: 10,
        }}
        aria-label="Previous"
      >
        <ArrowBackIosNewIcon fontSize="large" />
      </IconButton>
      {/* Flèche droite */}
      <IconButton
        onClick={nextImage}
        sx={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.30)',
          '&:hover': { bgcolor: 'rgba(34,197,94,0.8)', color: '#fff' },
          boxShadow: 2,
          zIndex: 10,
        }}
        aria-label="Next"
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>

      {/* Miniatures/thumbnails en bas */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 18,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          zIndex: 11,
        }}
      >
        {images.map((img, idx) => (
          <Box
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              overflow: 'hidden',
              border: idx === currentIndex ? '3px solid #22c55e' : '2px solid rgba(0,0,0,0.15)',
              boxShadow: idx === currentIndex ? 4 : 1,
              cursor: 'pointer',
              opacity: idx === currentIndex ? 1 : 0.7,
              transition: 'all 0.2s',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 12,
            }}
          >
            <img
              src={img}
              alt={`Miniature ${idx + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8,
                transition: 'transform 0.22s',
                transform: idx === currentIndex ? 'scale(1.09)' : 'scale(0.98)',
                filter: idx === currentIndex
                  ? 'drop-shadow(0 0 6px #22c55e55)'
                  : 'grayscale(0.2) brightness(0.95)',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ImageCarousel;
