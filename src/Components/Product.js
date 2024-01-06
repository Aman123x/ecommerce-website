import React from "react";

const productsArr = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },

  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },

  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },

  {
    title: "Blue Color",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Product = () => {
  return(
    <div className="d-flex flex-row bd-highlight mb-3">
        <h1>Music</h1>
        {
            productsArr.map((item,index)=>(
                <div key={index} >
                    <h1>{item.title}</h1>
                    <img src={item.imageUrl} alt={item.title}/>
                    <p>{item.price}</p>
                </div>
            ))
        }
    </div>
  )
};

export default Product;
