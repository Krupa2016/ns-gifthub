"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "../styles/Landing.css"
import nt from "../assets/nt.png"

const Landing = () => {
  const [isVisible, setIsVisible] = useState({
    hero: true,
    features: false,
    products: false,
    process: false,
    testimonials: false,
    cta: false,
  })

  const sectionRefs = {
    hero: useRef(null),
    features: useRef(null),
    products: useRef(null),
    process: useRef(null),
    testimonials: useRef(null),
    cta: useRef(null),
  }

  const [activeProduct, setActiveProduct] = useState(0)
  const products = [
    {
      id: 1,
      name: "Custom T-Shirts",
      description: "Premium quality t-shirts with your unique designs",
      image: "https://i.pinimg.com/736x/19/9f/f0/199ff03b1151dbabb1bf429957315eae.jpg",
    },
    {
      id: 2,
      name: "Personalized Jerseys",
      description: "Sport your style with custom printed jerseys",
      image: "https://i.pinimg.com/736x/ea/df/bd/eadfbdf2e04a3932768eeec6dffee6af.jpg",
    },
    {
      id: 3,
      name: "Custom Hoodies",
      description: "Stay warm with personalized hoodies and sweatshirts",
      image: "https://i.pinimg.com/736x/70/77/9c/70779c6c08be8f606747c923996a2e58.jpg",
    },
    {
      id: 4,
      name: "Accessories",
      description: "From keychains to phone cases - customize everything",
      image: "https://i.pinimg.com/736x/0d/69/5c/0d695c15a71ad53c8c9e567fe3abffce.jpg",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Event Organizer",
      text: "NS GiftHub delivered amazing custom t-shirts for our company retreat. The quality was outstanding and the designs were exactly what we wanted!",
      image: "https://i.pinimg.com/736x/03/15/cb/0315cb54b709c50d0b670ab3abcb02bc.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Basketball Team Captain",
      text: "We ordered custom jerseys for our entire team and they exceeded our expectations. Great quality, perfect fit, and they looked incredible on the court.",
      image: "https://i.pinimg.com/736x/41/de/78/41de78a6b617f1aeb066cad9d0a1ffc1.jpg",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Graphic Designer",
      text: "As a designer, I'm very particular about print quality. NS GiftHub nailed it! My artwork looked vibrant and exactly as designed on every product.",
      image: "https://i.pinimg.com/736x/fe/2d/4b/fe2d4bc9638b7aca6e0bfc98d70bc059.jpg",
    },
  ]

  useEffect(() => {
    const productInterval = setInterval(() => {
      setActiveProduct((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(productInterval)
  }, [products.length])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setIsVisible((prev) => ({ ...prev, [sectionId]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section id="hero" ref={sectionRefs.hero} className={`hero-section ${isVisible.hero ? "visible" : ""}`}>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Turn Your <span className="highlight">Creativity</span> Into Custom Products
            </h1>
            <p>
              NS GiftHub brings your unique designs to life on premium quality products. From t-shirts to accessories, we
              make custom printing easy, affordable, and fun.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="primary-button">
                Shop Now
              </Link>
              {/* <button className="secondary-button">Create Custom Design</button> */}
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={nt} alt="Custom printed t-shirt" />
              <div className="floating-element elem1">🎨</div>
              <div className="floating-element elem2">👕</div>
              <div className="floating-element elem3">✨</div>
              <div className="floating-element elem4">🛍️</div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={sectionRefs.features}
        className={`features-section ${isVisible.features ? "visible" : ""}`}
      >
        <div className="section-header">
          <h2>Why Choose NS GiftHub?</h2>
          <p>We make custom printing simple, high-quality, and affordable</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Easy Design Tools</h3>
            <p>Create custom designs with our intuitive online design studio - no design experience needed!</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Turnaround</h3>
            <p>From design to delivery in as little as 3-5 business days. Rush options available.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Premium Quality</h3>
            <p>High-quality materials and state-of-the-art printing technology for vibrant, long-lasting results.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Bulk Discounts</h3>
            <p>Order more and save more with our volume-based pricing. Perfect for teams and events.</p>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section
        id="products"
        ref={sectionRefs.products}
        className={`products-section ${isVisible.products ? "visible" : ""}`}
      >
        <div className="section-header">
          <h2>Our Custom Products</h2>
          <p>Express yourself with our wide range of customizable products</p>
        </div>

        <div className="products-showcase">
          <div className="product-display">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`product-slide ${index === activeProduct ? "active" : ""}`}
                style={{ transform: `translateX(${(index - activeProduct) * 100}%)` }}
              >
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="product-indicators">
            {products.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeProduct ? "active" : ""}`}
                onClick={() => setActiveProduct(index)}
              ></button>
            ))}
          </div>
        </div>

        <Link to="/shop" className="view-all-button">
          View All Products
        </Link>
      </section>

      {/* How It Works */}
      <section
        id="process"
        ref={sectionRefs.process}
        className={`process-section ${isVisible.process ? "visible" : ""}`}
      >
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Creating custom products is easy with our simple 4-step process</p>
        </div>

        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Choose Your Product</h3>
              <p>Select from our wide range of customizable products - from apparel to accessories.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Upload or Create Design</h3>
              <p>Upload your artwork or create a design from scratch using our online design tool.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Preview & Order</h3>
              <p>See exactly how your design will look, make adjustments, and place your order.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Receive & Enjoy</h3>
              <p>We'll print, package, and deliver your custom products right to your door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        ref={sectionRefs.testimonials}
        className={`testimonials-section ${isVisible.testimonials ? "visible" : ""}`}
      >
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied customers who love their custom products</p>
        </div>

        <div className="testimonials-container">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p>"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Preview */}
      {/* <section className="design-preview-section">
        <div className="design-preview-content">
          <div className="design-text">
            <h2>Try Our Design Tool</h2>
            <p>
              Our easy-to-use design tool lets you create custom products in minutes. Add text, upload images, or choose
              from our library of graphics.
            </p>
            <button className="primary-button">Start Designing Now</button>
          </div>
          <div className="design-tool-preview">
            <img src="/placeholder.svg?height=400&width=600" alt="Design tool preview" />
            <div className="tool-overlay">
              <div className="tool-element tool1">Text</div>
              <div className="tool-element tool2">Images</div>
              <div className="tool-element tool3">Colors</div>
              <div className="tool-element tool4">Templates</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section id="cta" ref={sectionRefs.cta} className={`cta-section ${isVisible.cta ? "visible" : ""}`}>
        <div className="cta-content">
          <h2>Ready to Create Your Custom Products?</h2>
          <p>Start designing today and bring your creativity to life!</p>
          <div className="cta-buttons">
            <Link to="/shop" className="primary-button">
              Shop Now
            </Link>
            <button className="secondary-button">Contact Us</button>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Landing
