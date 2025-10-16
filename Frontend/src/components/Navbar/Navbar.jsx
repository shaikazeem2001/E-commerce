import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import carticon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../../context/Shopcontext';


const Navbar = () => {
    const [menu,setMenu]=useState('shop')
    const{getTotalCartItems}=useContext(Shopcontext)
  return (
    <div className='navbar'>
      <div className="nav-logo">
      <Link to='/'> <img src={logo} alt="" /></Link>
      <Link to='/' style={{ textDecoration: 'none' }}>
  <p>Trend</p>
</Link>
      </div>
      <div className="nav-menu">
        <li onClick={(()=>{setMenu('shop')})}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu==='shop'? <hr/> :<></>} </li>
        <li onClick={(()=>{setMenu('mens')})}><Link style={{textDecoration:'none'}} to='/mens'>Mens</Link> {menu==='mens'? <hr/> :<></>}</li>
        <li onClick={(()=>{setMenu('womens')})}><Link style={{textDecoration:'none'}} to='/women'>Women</Link> {menu==='womens'? <hr/> :<></>}</li>
        <li onClick={(()=>{setMenu('kids')})}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu==='kids'? <hr/> :<></>}</li>
      </div>
      <div className="nav-login-cart">
       <Link to='/login'><button>Login</button></Link> 
        <Link to='/cart'><img src={carticon} alt="" /></Link> 
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
