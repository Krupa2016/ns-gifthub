import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Cart.css"

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const [subtotal, setSubtotal] = useState(0)
 

  const navigate = useNavigate()


  useEffect(() => {
    console.log('Cart useEffect triggered. Current cart:', cart);
    const total = cart.reduce((sum, item) => {
      const itemPrice =  (item.totalPrice || item.price) * item.quantity
      return sum + itemPrice
    }, 0)
    setSubtotal(total)
  }, [cart])

  // Helper function to determine which customization options to show
  const getCustomizationTags = (item) => {
    const tags = []
    const category = item.category

    // Size option - only for wearable items
    if (["tshirt", "jersey", "hoodie", "clothing", "headwear"].includes(category) && item.size) {
      tags.push(
        <span key="size" className="customization-tag">
          Size: {item.size}
        </span>,
      )
    }

    // Color option - for most items except stationery
    if (category !== "stationery" && item.color) {
      tags.push(
        <span key="color" className="customization-tag">
          Color: {item.color}
        </span>,
      )
    }

    // Jersey-specific options
    if (category === "jersey") {
      if (item.jerseyName) {
        tags.push(
          <span key="name" className="customization-tag">
            Name: {item.jerseyName}
          </span>,
        )
      }
      if (item.jerseyNumber) {
        tags.push(
          <span key="number" className="customization-tag">
            Number: {item.jerseyNumber}
          </span>,
        )
      }
    }
    // Custom text for non-jersey items
    else if (["tshirt", "hoodie", "mug", "bag", "accessory"].includes(category) && item.customText) {
      tags.push(
        <span key="text" className="customization-tag">
          Text: {item.customText}
        </span>,
      )
    }

    // Custom image for most items
    if (category !== "stationery" && item.customImage) {
      tags.push(
        <span key="image" className="customization-tag">
          Custom Image: Yes
        </span>,
      )
    }

    return tags
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
     <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <span className="header-product">Product</span>
            <span className="header-price">Price</span>
            <span className="header-quantity">Quantity</span>
            <span className="header-total">Total</span>
            <span className="header-action"></span>
          </div>

          {cart.map((item, index) => (
            <div key={`${item.uniqueId}-${index}`} className="cart-item">
              <div className="item-product">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-customizations">{getCustomizationTags(item)}</div>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>

              <div className="item-price">₹{item.price.toFixed(2)}</div>

              <div className="item-quantity">
                <button className="quantity-btn" onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button className="quantity-btn" onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}>
                  +
                </button>
              </div>

              {/* Calculate item total based on totalPrice or price */}
              <div className="item-total">₹{((item.totalPrice || item.price) * item.quantity).toFixed(2)}</div>

              <button className="remove-btn" onClick={() => removeFromCart(item.uniqueId)}>
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-row total">
            <span>Estimated Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
           <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button> 
          
          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
      
          </div>
        </div>
      </div>
  
    </>
   
  )
}

export default Cart