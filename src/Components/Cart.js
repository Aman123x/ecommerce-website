import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ProductConsumer from "../Context/ProductConsumer";
import "./Cart.css";

const Cart = () => {
  let { cartItem, setCartItem } = useContext(ProductConsumer);

  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const TotalCartItem = cartItem.reduce((accu, curr) => {
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

  const TotalPrice = cartItem.reduce((accu, item) => {
    accu += item.quantity * item.price;
    return accu;
  }, 0);

  function handleAlert() {
    cartItem !== 0 && window.alert("Thanks for purchasing with us!!!");
  }

  return (
    <div>
      <div className="cart-container">
        <div className="total-cart-item">{TotalCartItem}</div>
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
