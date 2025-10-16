import React from 'react'
import './Offers.css'
import exculsive_image from '../assets/exclusive_image.png'
const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY FOR BEST SELLERS PRODUCTS</p>
        <button>check now</button>
      </div>
      <div className="offers-right">
        <img src={exculsive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
