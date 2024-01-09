import './App.css';
import { Route,Routes,Link } from 'react-router-dom';
import Product from './Components/Product';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Components/Cart';
import ProductProvider from './Context/ProductProvider';
import About from "./Components/About";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  return (
    <ProductProvider>
      <Navbar className="bg-dark sticky-top" >
        <Container>
            <Link to="/" className="text-white onactive">Home</Link>
            <Link to="/Product" className="text-white onactive">Store</Link>
            <Link to="/About" className="text-white onactive">About</Link>
          <Cart />
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Product' element={<Product />}/>
        <Route path='/About' element={<About />}/>
      </Routes>
      <Footer />
    </ProductProvider>
  );
}

export default App;
