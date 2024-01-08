import React from 'react'
import etsy from "../Assests/etsy.png"
import youtube from "../Assests/youtube.png"
import insta from "../Assests/instagram.png"


const Footer = () => {
  return (
    <div className='footer'>
        <h1>CoolCoverZone</h1>
        <div className='footer-icon'>
            <button><img src={etsy} alt="icon"/></button>
            <button><img src={youtube} alt="icon"/></button>
            <button><img src={insta} alt="icon"/></button>
        </div>
    </div>
  )
}

export default Footer