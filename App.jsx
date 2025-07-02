import { useState } from 'react'
import './App.css'
import GooeyNav from './components/GooeyNav'
import Herosection from './components/Herosection';
import Card from './components/Card';  
import Footer from './components/Footer';
import Header from "./components/Header"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import ProductCustomization from "./pages/ProductCustomization"
import Checkout from "./pages/Checkout"


function App() {


        const [cart, setCart] = useState([])

        const addToCart = (product) => {
          const existingItem = cart.find(
            (item) =>
              item.uniqueId === product.uniqueId &&
              item.size === product.size &&
              item.color === product.color &&
              item.customText === product.customText,
          )
     
          if (existingItem) {
            setCart(
              cart.map((item) =>
                item.uniqueId === product.uniqueId &&
                item.size === product.size &&
                item.color === product.color &&
                item.customText === product.customText
                  ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                  : item,
              ),
            )
          } else {
            setCart([...cart, { ...product, quantity: product.quantity || 1 }])
          }
        }

        const removeFromCart = (uniqueIdToRemove) => { // Expect uniqueId
          setCart(cart.filter((item) => item.uniqueId !== uniqueIdToRemove)); // Filter by uniqueId
        };
        
  const clearCart = () => {
    setCart([])
  }
        const updateQuantity = (uniqueIdToUpdate, newQuantity) => {
          if (newQuantity <= 0) {
            removeFromCart(uniqueIdToUpdate)
            return
          }

          setCart(
            cart.map((item) =>
              item.uniqueId === uniqueIdToUpdate // Use uniqueId for mapping
                ? { ...item, quantity: newQuantity }
                : item
              )
            );
          };
        



        return (
          <>
            <Router>
            <div className="app">
            <ScrollToTop />
              <Header cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                <Route path="/customize" element={<ProductCustomization addToCart={addToCart} />} />
                <Route
                  path="/cart"
                  element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
                />
                  <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
              </Routes>
            </div>
          </Router>
          <Footer />
          </>

          )


}

export default App


