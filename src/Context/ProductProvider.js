import { useState } from "react";
import ProductConsumer from "./ProductConsumer"

const ProductProvider=(props)=>{

    const[cartItem,setCartItem]=useState([]);

    function handleCart(item){
        const existingItem=cartItem.find((cartItem)=>cartItem.title===item.title);

        if(existingItem){
            const updateItem=cartItem.map((cartItem)=>(
                cartItem.title===item.title?{...cartItem,quantity:cartItem.quantity+1}:cartItem
            ))
            setCartItem(updateItem);
        }
        else{
            setCartItem([...cartItem,{...item,quantity:1}])
        }
    }

    return(
        <ProductConsumer.Provider value={{cartItem,setCartItem,handleCart}}>
            {props.children}
        </ProductConsumer.Provider>
    )
}

export default ProductProvider;