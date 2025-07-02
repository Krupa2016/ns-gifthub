"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/Header.css"

const Header = ({ cartItemCount }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">NS GiftHub</span>
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link ">
            Home
          </Link>
          <Link to="/shop" className="nav-link ">
            Shop
          </Link>
          {/* <Link to="/" className="nav-link">
            Custom Design
          </Link>
          <Link to="/" className="nav-link">
            About Us
          </Link>
          <Link to="/" className="nav-link">
            Contact
          </Link> */}
        </div>

        <div className="header-actions">
          {/* <button className="search-btn">
            <span className="search-icon">🔍</span>
          </button> */}
          <Link to="/cart" className="cart-btn">
            <span className="cart-icon">🛒</span>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <div className={`menu-icon ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
