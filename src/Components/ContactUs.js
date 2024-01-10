import React, { useEffect, useState } from 'react'

const ContactUs = () => {

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [btn,setBtn]=useState({});

    useEffect(()=>{
        if (Object.keys(btn).length > 0) {
            PostData(btn);
        }
    },[btn])

    function handleSubmit(e){
        e.preventDefault();

        if(name==="" || email==="" || phone===""){
            return;
        }
        
        setBtn((prevBtn) => ({ ...prevBtn, name, email, phone }));
        setName("");
        setEmail("");
        setPhone(""); 
    }

    async function PostData(btn){
        const response=await fetch("https://ecommerce-app-1455f-default-rtdb.asia-southeast1.firebasedatabase.app/formData.json",{
            method:"POST",
            body:JSON.stringify(btn),
            headers:{
                "Content-Type":"application/json"
            }
        });
        setBtn("");
        // const data=await response.json();

        // console.log(data);
    }

  return (
    <div>
        <h3>If you have any query fill the form</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>Name: </label>
            <input type="text"
                onChange={(e)=>setName(e.target.value)}
                value={name}
            />

            <label>Email: </label>
            <input type="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
            />

            <label>Phone no.: </label>
            <input type="text"
                onChange={(e)=>setPhone(e.target.value)}
                value={phone}
            />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ContactUs