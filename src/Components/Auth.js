import React, { useContext, useEffect, useState } from "react";
import ProductConsumer from "../Context/ProductConsumer";

const Auth = () => {

  let {isLogin,setIsLogin,token,setToken}=useContext(ProductConsumer)

  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [btn,setBtn]=useState({});
  // const [isLogin,setIsLogin] = useState(false);

  function handleAuth(e){
    e.preventDefault();
    setBtn({inputEmail,inputPass})

  }

  useEffect(()=>{
    if(isLogin && Object.keys(btn).length>0){
        handleLogIn(btn)
    }
    else if(Object.keys(btn).length>0){
        handleSignUp(btn)
    }
  },[btn])

    async function handleSignUp(btn){
        console.log(btn.inputEmail);
        console.log(btn.inputPass);
        try{
            const response= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method:"POST",
                body: JSON.stringify({
                    email: btn.inputEmail,
                    password: btn.inputPass,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data=await response.json();
            console.log(data)
            setIsLogin(true);
            setToken(data.idToken)
            console.log(data.idToken)
            setBtn({});
        }
        catch(err){
            console.log(err.message);
        }
    }

    async function handleLogIn(btn){
        try{
            const response= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTHENTICATION_API_KEY}`,{
                method: "POST",
                body: JSON.stringify({
                    email: btn.inputEmail,
                    password: btn.inputPass,
                    returnSecureToken: true,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data=await response.json();
            console.log(data)
        }
        catch(err){
            console.log(err.message);
        }
    }

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleAuth}>
        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setInputEmail(e.target.value)}
          value={inputEmail}
        />

        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setInputPass(e.target.value)}
          value={inputPass}
        />
        {isLogin ? <button type="submit">Login</button> : <button type="submit">SignUp</button>}
      </form>
    </div>
  );
};

export default Auth;
