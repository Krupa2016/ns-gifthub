"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import FilterBar from "../components/FilterBar"
import "../styles/Shop.css"

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating API fetch with sample data
    const fetchProducts = () => {
      setIsLoading(true)
      setTimeout(() => {
        const sampleProducts = [
       
          // ***********T-SHIRTS*************
          {
            id: 1,
            name: "Custom Graphic T-Shirt",
            price: 29.99,
            category: "tshirt",
            image: "https://i.pinimg.com/736x/19/9f/f0/199ff03b1151dbabb1bf429957315eae.jpg",
            description: "Express yourself with our premium custom printed t-shirt.",
          },
      
          {
            id: 2,
            name: "Personalized Jersey",
            price: 49.99,
            category: "jersey",
            image: "https://i.pinimg.com/736x/ea/df/bd/eadfbdf2e04a3932768eeec6dffee6af.jpg",
            description: "High-quality custom jersey with your name and number.",
          },
          {
            id: 3,
            name: "Custom Keychain",
            price: 12.99,
            category: "keychain",
            image: "https://i.pinimg.com/736x/58/81/e5/5881e545844fb6662968a67f2a4f8803.jpg",
            description: "Carry your memories with our durable custom keychains.",
          },
          {
            id: 4,
            name: "Printed Hoodie",
            price: 59.99,
            category: "hoodie",
            image: "https://i.pinimg.com/736x/70/77/9c/70779c6c08be8f606747c923996a2e58.jpg",
            description: "Stay warm and stylish with our custom printed hoodie.",
          },
          {
            id: 5,
            name: "Custom Phone Case",
            price: 24.99,
            category: "accessory",
            image: "https://i.pinimg.com/736x/0d/69/5c/0d695c15a71ad53c8c9e567fe3abffce.jpg",
            description: "Protect your phone with a case that shows your personality.",
          },
          {
            id: 6,
            name: "Printed Mug",
            price: 19.99,
            category: "homeware",
            image: "https://i.pinimg.com/736x/24/03/1d/24031dfc369d1572d1a7409ee12f4703.jpg",
            description: "Start your day with a custom printed mug.",
          },
          {
            id: 7,
            name: "Custom Cap",
            price: 24.99,
            category: "headwear",
            image: "https://i.pinimg.com/736x/12/b7/64/12b7644c6b3943853969c5d093446a25.jpg",
            description: "Top off your look with our custom printed cap.",
          },
          {
            id: 8,
            name: "Graphic Tote Bag",
            price: 18.99,
            category: "bag",
            image: "https://i.pinimg.com/736x/3c/83/38/3c833810a447cfb39aca539551f0685f.jpg",
            description: "Eco-friendly tote bag with your custom design.",
          },
          {
            id: 9,
            name: "Custom t-shirt",
            price: 14.99,
            category: "clothing",
            image: "https://i.pinimg.com/736x/9c/64/ad/9c64adf8a984abae655633e160b5b80b.jpg",
            description: "Stand out with our custom printed socks.",
          },
          {
            id: 10,
            name: "Printed Notebook",
            price: 15.99,
            category: "stationery",
            image: "https://i.pinimg.com/736x/2b/7a/f2/2b7af204279d48135a5494bbfb950696.jpg",
            description: "Capture your thoughts in our custom printed notebook.",
          },
          {
            id: 11,
            name: "Custom Photo Frames",
            price: 34.99,
            category: "frames",
            image: "https://i.pinimg.com/736x/fd/af/b5/fdafb5b7516927e0ca2e34d5d936a2d6.jpg",
            description: "Retro vibes with our vintage style custom t-shirt.",
          },
          {
            id: 12,
            name: "Sports Jersey",
            price: 54.99,
            category: "jersey",
            image: "https://i.pinimg.com/736x/df/32/3e/df323e4927de0162e6ec6a22617ce8bf.jpg",
            description: "Professional quality custom sports jersey.",
          },
        ]
        setProducts(sampleProducts)
        setFilteredProducts(sampleProducts)
        setIsLoading(false)
      }, 1000)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // 'featured'
        // Keep original order
        break
    }

    setFilteredProducts(result)
  }, [products, activeCategory, sortBy])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption)
  }

  const categories = [
    { id: "all", name: "All Products" },
    { id: "tshirt", name: "T-Shirts" },
    { id: "jersey", name: "Jerseys" },
    { id: "hoodie", name: "Hoodies" },
    { id: "headwear", name: "Caps & Hats" },
    { id: "keychain", name: "Keychains" },
    { id: "accessory", name: "Accessories" },
    { id: "homeware", name: "Home & Living" },
    { id: "stationery", name: "Stationery" },
  ]

  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "name", name: "Name: A to Z" },
  ]

  return (
    <div className="shop-container">
      <div className="shop-hero">
        <div className="shop-hero-content">
          <h1>Turn Your Creativity Into Custom Products</h1>
          <p>Unique designs for unique people. Express yourself with ns.trends.</p>
        </div>
      </div>

      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        sortOptions={sortOptions}
        activeSortOption={sortBy}
        onSortChange={handleSortChange}
      />

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try changing your filter options</p>
            </div>
          )}
        </div>
      )}

      <div className="shop-features">
        <div className="feature">
          <div className="feature-icon">🎨</div>
          <h3>Custom Designs</h3>
          <p>Upload your artwork or use our design tools</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Quick production and delivery worldwide</p>
        </div>
        <div className="feature">
          <div className="feature-icon">✨</div>
          <h3>Premium Quality</h3>
          <p>High-quality materials and printing techniques</p>
        </div>
      </div>
    </div>
  )
}

export default Shop
