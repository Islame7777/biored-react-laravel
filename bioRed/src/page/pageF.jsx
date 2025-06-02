
import Navbar from "../components/header/Navbar";
import Navbar2 from "../components/header/Navbar2";
import Navbar3 from "../components/header/Navbar3";
import Promo from '../components/hero/filtrer';
import Footer from "../components/footer/footer";

import React from 'react'

function pageA() {
  return (
    <>
 <Navbar />
              <Navbar2 />
              <Navbar3 />
              <Promo/>
              <Footer/>
              </>
  )
}

export default pageA