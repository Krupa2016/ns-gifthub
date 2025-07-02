

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/ProductCard.css"

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleProductClick = () => {
    navigate("/customize", { state: { product } })
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick view functionality could be added here
    navigate("/customize", { state: { product } })
  }

  return (
    <div
      className={`sproduct-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleProductClick}
    >
      <div className="sproduct-image-container">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="sproduct-image" />
        <div className="sproduct-overlay">
          <button className="squick-view-btn" onClick={handleProductClick}>
            Customize Now
          </button>
          {/* <button className="squick-view-btn" onClick={handleQuickView}>
            Quick View
          </button> */}
        </div>
      </div>

      <div className="sproduct-info">
        <h3 className="sproduct-name">{product.name}</h3>
        <p className="sproduct-price">From ₹{product.price.toFixed(2)}</p>
        <p className="sproduct-category">{product.category}</p>
      </div>
    </div>









  )
}

export default ProductCard
