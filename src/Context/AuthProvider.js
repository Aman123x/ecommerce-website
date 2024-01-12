import React, { useState } from 'react'
import ProductConsumer from './ProductConsumer'

const AuthProvider = (props) => {

    const[isLogin,setIsLogin]=useState(false);

    const initialToken="";
    const [token,setToken]=useState(initialToken);



  return (
    <ProductConsumer.Provider value={{setIsLogin,isLogin,token,setToken}}>
        {props.children}
    </ProductConsumer.Provider>
  )
}

export default AuthProvider