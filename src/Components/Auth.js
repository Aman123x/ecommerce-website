import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {

  let {setIsLogin,loginHandler}=useContext(AuthContext)

  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [btn,setBtn]=useState({});
  const navigate = useNavigate();

  function handleAuth(e){
    e.preventDefault();
    setBtn({inputEmail,inputPass})
  }

  useEffect(()=>{
    if(Object.keys(btn).length>0){
        handleLogIn(btn)
    }
  },[btn,navigate])

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
        // console.log(data)
        // setIsLogin(true);
        loginHandler(data.idToken)
        // console.log(token)
        setBtn({});
        navigate("/Product")
    }
    catch(err){
        console.log(err.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
