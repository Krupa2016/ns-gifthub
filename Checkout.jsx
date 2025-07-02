"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Checkout.css"

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    phone: "",

    // Shipping Information
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment Information
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "United States",
  })

  const [errors, setErrors] = useState({})

  // Calculate order summary
  const subtotal = Math.round(cart.reduce((sum, item) => sum + ((item.totalPrice || item.price) * item.quantity), 0) * 100) / 100;
  const shipping = 6; // Changed from 5.99 to 6
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shipping + tax) * 100) / 100;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      if (!formData.address) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.state) newErrors.state = "State is required"
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
    }

    if (step === 2) {
      if (!formData.cardName) newErrors.cardName = "Name on card is required"
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required"
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
        newErrors.cardNumber = "Card number must be 16 digits"

      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Format must be MM/YY"

      if (!formData.cvv) newErrors.cvv = "CVV is required"
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits"

      if (!formData.sameAsShipping) {
        if (!formData.billingAddress) newErrors.billingAddress = "Billing address is required"
        if (!formData.billingCity) newErrors.billingCity = "Billing city is required"
        if (!formData.billingState) newErrors.billingState = "Billing state is required"
        if (!formData.billingZipCode) newErrors.billingZipCode = "Billing ZIP code is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateStep(currentStep)) {
      // Process order (in a real app, this would send data to a server)
      alert("Order placed successfully! Thank you for shopping with ns.trends.")
      clearCart()
      navigate("/")
    }
  }

  const handlePayment = async () => {
    if (!validateStep(currentStep)) return;

    try {
      console.log('Original total:', total);
      console.log('Total type:', typeof total);
      
      // Convert to paise and ensure it's a proper integer
      const amountToSend = Math.floor(total * 100);
      console.log('Amount to send:', amountToSend);
      console.log('Amount type:', typeof amountToSend);
      
      const response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountToSend,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json();
      console.log('Order response:', order);

      const options = {
        key: 'rzp_test_YC3tpaItr1TQbb',
        amount: order.amount,
        currency: order.currency,
        name: 'NS.Trends',
        description: 'Order Payment',
        order_id: order.id,
        handler: function (response) {
          // Handle successful payment
          alert('Payment successful!');
          
          // Send order details to server
          const sendOrderDetails = async () => {
            try {
              const response = await fetch('http://localhost:3000/send-order-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //   orderDetails: {
                //     receipt: `order_${Date.now()}`,
                //     items: cart,
                //     subtotal,
                //     shipping,
                //     tax,
                //     total
                //   },
                //   customerInfo: {
                //     firstName: formData.firstName,
                //     lastName: formData.lastName,
                //     email: formData.email,
                //     phone: formData.phone,
                //     address: formData.address,
                //     city: formData.city,
                //     state: formData.state,
                //     zipCode: formData.zipCode,
                //     country: formData.country
                //   }
                // })

                body: JSON.stringify({
                    orderDetails: {
                      receipt: `order_${Date.now()}`,
                      items: cart, // This will include image base64 inside each item
                      subtotal,
                      shipping,
                      tax,
                      total,
                    },
                    customerInfo: {
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      city: formData.city,
                      state: formData.state,
                      zipCode: formData.zipCode,
                      country: formData.country,
                    }
                  })

              });

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send order details');
              }

              const data = await response.json();
              console.log('Order details sent successfully:', data);
            } catch (error) {
              console.error('Error sending order details:', error);
              alert('Order was successful but we could not send the details to the supplier. Please contact support.');
            } finally {
              clearCart();
              navigate('/');
            }
          };

          // Call the async function
          fetch('http://localhost:3000/send-order-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderDetails: {
                receipt: `order_${Date.now()}`,
                items: cart,
                subtotal,
                shipping,
                tax,
                total
              },
              customerInfo: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country
              }
            })
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.error || 'Failed to send order details');
              });
            }
            return response.json();
          })
          .then(data => {
            console.log('Order details sent successfully:', data);
          })
          .catch(error => {
            console.error('Error sending order details:', error);
            alert('Order was successful but we could not send the details to the supplier. Please contact support.');
          });
          
          clearCart();
          navigate('/');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#3399cc',
          svg: {
            width: '24px',
            height: '24px'
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // If cart is empty, redirect to shop
  if (cart.length === 0) {
    navigate("/shop")
    return null
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
  
      </div>

      <div className="checkout-content">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            {currentStep === 1 && (
              <div className="checkout-step shipping-step">
                <h2>Shipping Information</h2>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}  
                   className={errors.phone ? "error" : ""}required />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "error" : ""}
                      required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "error" : ""}
                      required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

           
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? "error" : ""}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={errors.zipCode ? "error" : ""}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange}>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>

                <div className="form-actions">
                 
                  
                  <button type="button" className="continue-btn" onClick={handlePayment}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map((item, index) => (
              <div key={index} className="summary-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-name">{item.name}</div>
                <div className="item-price">₹{(item.totalPrice || item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
  
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
