import { useContext, useEffect, useState } from "react";
import ProductConsumer from "./ProductConsumer";
import axios from "axios";
import AuthContext from "./AuthContext";

const ProductProvider = (props) => {
  const { inputEmail, isLogin } = useContext(AuthContext);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    if (isLogin && cartItem.length>1) {
      getCartData();
    }
  }, [isLogin]);

  const getCartData = async () => {
    try {
        const response = await axios.get(
            `https://crudcrud.com/api/d2b38faa5186400aba59c3f9f8f7d208/inventData?newMail=${inputEmail.replace(
              /[.@]/g,
              ""
            )}`
          );
      if (response.data) {
        setCartItem(response.data.cartItem);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCart = async (item) => {
    // Check if cartItem is not an empty array
    if (cartItem && cartItem.length > 0) {
      const existingItem = cartItem.find(
        (cartItem) => cartItem.title === item.title
      );
  
      if (existingItem) {
        // If the item already exists, update the quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
  
        try {
          if (existingItem._id) {
            await axios.put(
              `https://crudcrud.com/api/d2b38faa5186400aba59c3f9f8f7d208/inventData/${existingItem._id}`,
              updatedItem
            );
          } else {
            console.error("Item ID is undefined.");
          }
  
          getCartData(); // Refresh cart data after update
        } catch (err) {
          console.log(err);
        }
      } else {
        // If the item doesn't exist, create a new entry
        try {
          await axios.post(
            "https://crudcrud.com/api/d2b38faa5186400aba59c3f9f8f7d208/inventData",
            {
              newMail: inputEmail.replace(/[.@]/g, ""),
              cartItem: [...cartItem, { ...item, quantity: 1 }],
            }
          );
  
          getCartData(); // Refresh cart data after create
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      // If cartItem is an empty array, create a new entry
      try {
        await axios.post(
          "https://crudcrud.com/api/d2b38faa5186400aba59c3f9f8f7d208/inventData",
          {
            newMail: inputEmail.replace(/[.@]/g, ""),
            cartItem: [{ ...item, quantity: 1 }],
          }
        );
  
        getCartData(); // Refresh cart data after create
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  

  return (
    <ProductConsumer.Provider value={{ cartItem, setCartItem, handleCart }}>
      {props.children}
    </ProductConsumer.Provider>
  );
};

export default ProductProvider;
