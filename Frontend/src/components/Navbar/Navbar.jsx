import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import carticon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../../context/Shopcontext';
import dropdown_icon from '../../assets/Assets/Frontend_Assets/dropdown_icon.png'

const Navbar = () => {
    const [menu,setMenu]=useState('shop')
    const{getTotalCartItems}=useContext(Shopcontext)
    const menuRef=useRef();

    const dropdown_toggle=((e)=>{
      menuRef.current.classList.toggle('nav-menu-visible')
      e.target.classList.toggle('open')
    })
  return (
    <div className='navbar'>
      <div className="nav-logo">
      <Link to='/'> <img src={logo} alt="" /></Link>
      <Link to='/' style={{ textDecoration: 'none' }}>
  <p>Trend</p></Link>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
      <div ref={menuRef} className="nav-menu">
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
