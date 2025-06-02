
// import Navbar from "./components/header/navbar"
// import Navbar2 from "./components/header/navbar2";
// import Navbar3 from "./components/header/navbar3";
import { CssBaseline} from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
import Page from "./page/page";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Login from "./components/connexion/login";
import Login from "./components/connexion/Login";
import PageP from "./page/pageP"

import PageCadeau from "./page/pageCadeau";
import PagePromo from "./page/pagePromo";
import PageA from "./page/pageA";
import PageAp from "./page/pageAp";
import PageAc from "./page/pageAc";
import PageG from "./page/pageG";
import PageS from "./page/pageS";
import PageC from "./page/pageC";
import PageF from "./page/pageF";
import pageA from "./page/pageaff"

// import Home from './components/Home';
// import Dashboard from './components/Dashboard';
// import NotFound from './components/NotFound';

// Thème principal de l'application
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // vert foncé
    },
    secondary: {
      main: '#81c784', // vert clair
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Page/>} />
          <Route path="/product" element={<PageP/>} />
          <Route path="/promotion" element={<PagePromo/>} />
          <Route path="/cadeau" element={<PageCadeau/>} />
          <Route path="/admin" element={<PageA/>} />    
           <Route path="/admin/produit" element={<PageAp/>} />
           <Route path="/admin/categorie" element={<PageAc/>} />
           <Route path="/admin/gestion" element={<PageG/>} />  
               <Route path="/admin/statistique" element={<PageS/>} />
               <Route path="/admin/commande" element={<PageC/>}/>
               <Route path="/product/:slug" element={<PageF />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}


export default App;
