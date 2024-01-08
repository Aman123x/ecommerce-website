import './App.css';
import Product from './Components/Product';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Components/Cart';
import ProductProvider from './Context/ProductProvider';

function App() {
  return (
    <ProductProvider>
      <Navbar className="bg-dark sticky-top" >
        <Container>
          <Navbar.Brand href="/" className="text-white onactive">Home</Navbar.Brand>
          <Navbar.Brand href="/" className="text-white onactive">Store</Navbar.Brand>
          <Navbar.Brand href="/" className="text-white onactive">About</Navbar.Brand>
          <Cart />
        </Container>
      </Navbar>
      <Product />
    </ProductProvider>
  );
}

export default App;
