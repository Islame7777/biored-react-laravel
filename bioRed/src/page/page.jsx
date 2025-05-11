import ImageMain from "../components/main/ImageMain";
import Navbar from "../components/header/Navbar";
import Navbar2 from "../components/header/Navbar2";
import Navbar3 from "../components/header/Navbar3";
import Cards from '../components/main/cards';
import OurHistory from "../components/main/OurHistory";
import TopPacks from "../components/main/TopPack";
import Footer from "../components/footer/footer";

function Page() {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <Navbar2 />
        <Navbar3 />
      </div>

      {/* Image juste en dessous des navbars */}
      <div style={{ marginTop: '20px' }}>
        <ImageMain />
      </div>

      {/* Ensuite les cards */}
      <div style={{ marginTop: '40px' }}>        
        <Cards />
        <TopPacks/>
        <OurHistory/>
      </div>
      <Footer/>
      
    </>
  );
}

export default Page;
