import './App.css';
import Product from './Components/Product';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Components/Cart';

function App() {
  return (
    <div>
      <Navbar className="bg-dark" >
        <Container>
          <Navbar.Brand href="/" className="text-white">Home</Navbar.Brand>
          <Navbar.Brand href="/" className="text-white">Store</Navbar.Brand>
          <Navbar.Brand href="/" className="text-white">About</Navbar.Brand>
          <Cart />
        </Container>
      </Navbar>
      <Product />
    </div>
  );
}

export default App;
