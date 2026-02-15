import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import carticon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { Shopcontext } from '../../context/Shopcontext';
import { ThemeContext } from '../../context/ThemeContext';
import { ShoppingCart, LogIn, LogOut, Sun, Moon } from '../Icons';
import dropdown_icon from '../../assets/Assets/Frontend_Assets/dropdown_icon.png';
import api from '../../api/axios';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(Shopcontext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const menuRef = useRef();

  // ✅ Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/check-auth');
        if (response.data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setIsLoggedIn(false);
      window.location.replace('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to='/'><img src={logo} alt="Trend Logo" /></Link>
        <Link to='/' style={{ textDecoration: 'none' }}><p>Trend</p></Link>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="Menu Toggle" />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link style={{ textDecoration: 'none' }} to='/' className="text-hover">Shop</Link>
          {menu === 'shop' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link style={{ textDecoration: 'none' }} to='/mens' className="text-hover">Mens</Link>
          {menu === 'mens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link style={{ textDecoration: 'none' }} to='/women' className="text-hover">Women</Link>
          {menu === 'womens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link style={{ textDecoration: 'none' }} to='/kids' className="text-hover">Kids</Link>
          {menu === 'kids' ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="nav-login-cart">
          {isLoggedIn ?
            <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /> Logout</button> :
            <Link to='/login'><button className="login-btn"><LogIn size={18} /> Login</button></Link>
          }
          <div className="cart-container">
            <Link to='/cart'><ShoppingCart size={28} className="cart-icon" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
