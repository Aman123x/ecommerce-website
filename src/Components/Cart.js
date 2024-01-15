import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ProductConsumer from "../Context/ProductConsumer";
import "./Cart.css";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

const Cart = () => {
  let { cartItem, setCartItem } = useContext(ProductConsumer);
  let {inputEmail,isLogin}=useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [total,setTotal]=useState(0);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isLogin) {
      showCartTotal();
    }
  }, [cartItem]);
  
  async function showCartTotal() {
    try {
      const response = await axios.get(
        `https://crudcrud.com/api/d2b38faa5186400aba59c3f9f8f7d208/inventData?newMail=${inputEmail.replace(
          /[.@]/g,
          ""
        )}`
      );
  
      if (response.data && response.data.length > 0) {
        const lastAddedEntry = response.data[response.data.length - 1];
  
        const count = lastAddedEntry.cartItem.reduce(
          (accu, cartItem) => accu + cartItem.quantity,
          0
        );
  
        setTotal(count);
        console.log("Total cart items for the user:", count);
      }
    } catch (err) {
      console.log(err);
    }
  }
  

  const TotalCartItem = (cartItem ?? []).reduce((accu, curr) => {
    accu += curr.quantity;
    return accu;
  }, 0);

  function increaseItem(ind) {
    setCartItem((prevItem) =>
      prevItem.map((item, index) =>
        index === ind ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function reduceItem(ind) {
    setCartItem((prevItem) =>
      prevItem
        .map((item, index) =>
          item.quantity > 0 && index === ind
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const TotalPrice = (cartItem ?? []).reduce((accu, item) => {
    accu += item.quantity * item.price;
    return accu;
  }, 0);

  function handleAlert() {
    (TotalPrice !== 0) && window.alert("Thanks for purchasing with us!!!");
  }

  return (
    <div>
      <div className="cart-container">
        <div className="total-cart-item">{total}</div>
        <Button onClick={handleModalShow}>Cart</Button>
      </div>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        dialogClassName="modal-right"
      >
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <div className="heading">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p></p>
        </div>
        <Modal.Body>
          <div className="product-card">
            {cartItem &&
              cartItem.map((item, index) => (
                <div className="product-child" key={index}>
                  <div className="product-child_image">
                    <img src={item.imageUrl} alt={item.title} />
                    <p>{item.title}</p>
                  </div>
                  <p>{item.price}</p>
                  <p>{item.quantity}</p>
                  <div className="btn">
                    <button onClick={() => reduceItem(index)}>-</button>
                    <button onClick={() => increaseItem(index)}>+</button>
                  </div>
                </div>
              ))}
          </div>
        </Modal.Body>
        <h3 className="total">Total : $ {TotalPrice.toFixed(2)}</h3>
        <button onClick={handleAlert} className="purchase">
          Purchase
        </button>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
