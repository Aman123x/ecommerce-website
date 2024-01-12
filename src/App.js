import './App.css';
import { Route,Routes,Link, Navigate } from 'react-router-dom';
import Product from './Components/Product';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Components/Cart';
import ProductProvider from './Context/ProductProvider';
import About from "./Components/About";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import ContactUs from './Components/ContactUs';
import Auth from "./Components/Auth"
import { useContext } from 'react';
import AuthContext from './Context/AuthContext';
import Logout from './Components/Logout';


function App() {

  let{isLogin}=useContext(AuthContext)

  return (
      
    <ProductProvider>
      <Navbar className="bg-dark sticky-top" >
        <Container>
            <Link to="/Home" className="text-white onactive">Home</Link>
            <Link to="/Product" className="text-white onactive">Store</Link>
            <Link to="/About" className="text-white onactive">About</Link>
            <Link to="/ContactUs" className="text-white onactive">Contact Us</Link>
            <Link to="/" className="text-white onactive">Auth</Link>
          <Cart />
        </Container>
      </Navbar>
      <Routes>
        <Route path='/Home' element={<Home />}/>
        {/* {isLogin && <Route path='/Product' element={<Product />}/>} */}

        {isLogin ? (
          <Route path='/Product' element={<Product />} />
        ) : (
          <Route path='/Product' element={<Navigate to="/" />} />
        )}
        <Route path='/About' element={<About />}/>
        <Route path='/ContactUs' element={<ContactUs />}/>
        {!isLogin && <Route path='/' element={<Auth />} />}
      </Routes>
      <Footer />
    </ProductProvider>
  );
}

export default App;
