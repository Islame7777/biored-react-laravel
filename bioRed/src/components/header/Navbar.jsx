// @ts-nocheck
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { Box, IconButton, useTheme, Stack, Container } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import logo from "../../images/logo.png";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "#5a5f37", height: "65px" }}>
      <Container/>
      <Stack direction="row" alignItems="center" sx={{ px: 2, width: "100%" }}>
        {/* Logo avec un léger ajustement de margin */}
        <img src={logo} alt="Logo" style={{ marginTop: "-17px" }} />

        {/* Box pour aligner l'icône en haut à droite */}
        <Box flexGrow={1} display="flex" justifyContent="flex-end" alignItems="flex-start">

          
           <InstagramIcon sx={{marginTop: "-20px", fontSize: "25px" }}/>           
           <FacebookIcon sx={{marginTop: "-20px", fontSize: "25px" }}/> </Box>
        </Stack>
      
    </Box>
  );
}

export default Navbar;
