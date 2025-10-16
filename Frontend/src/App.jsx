import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import ShopCatogory from './pages/ShopCatogory'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Footer from './components/Footer/Footer'
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kids_banner from './components/assets/banner_kids.png'
function App() {
 

  return (
    <>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<ShopCatogory banner={men_banner} catogory='men'/>}/>
      <Route path='/women' element={<ShopCatogory banner={women_banner} catogory='women'/>}/>
      <Route path='/kids' element={<ShopCatogory banner={kids_banner} catogory='kid'/>}/>
      <Route path="/product/:productID" element={<Product />} />
      <Route path='cart' element={<Cart/>}/>
      <Route path='login' element={<LoginSignup/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
