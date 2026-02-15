import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ShopCategory from './pages/ShopCategory'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Footer from './components/Footer/Footer'
import Checkout from './pages/Checkout'
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kids_banner from './components/assets/banner_kids.png'
import CustomCursor from './components/CustomCursor/CustomCursor'

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
        <Route path='/women' element={<ShopCategory banner={women_banner} category='women' />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category='kids' />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path='cart' element={<Cart />} />
        <Route path='login' element={<LoginSignup />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
