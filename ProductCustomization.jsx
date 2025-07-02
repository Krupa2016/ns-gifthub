

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "../styles/ProductCustomization.css"

const ProductCustomization = ({ addToCart }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { product } = location.state || {}

  // Redirect if no product is passed
  useEffect(() => {
    if (!product) {
      navigate("/shop")
    }
  }, [product, navigate])

  const [customizedProduct, setCustomizedProduct] = useState({
    ...product,
    size: "M",
    material: "Plain", 
    color: "white",
    customImage: null,
    customText: "",
    // customFont: "Arial",
    jerseyName: "",
    jerseyNumber: "",
    quantity: 1,
    notes: "",
    totalPrice: product?.price || 0,
  })

  const [imagePreview, setImagePreview] = useState(null)

  // Available options
  const sizeOptions = [
    { value: "XS", label: "Extra Small", priceAdjustment: -2 },
    { value: "S", label: "Small", priceAdjustment: -1 },
    { value: "M", label: "Medium", priceAdjustment: 0 },
    { value: "L", label: "Large", priceAdjustment: 0 },
    { value: "XL", label: "Extra Large", priceAdjustment: 1 },
    { value: "XXL", label: "Double XL", priceAdjustment: 2 },
  ]


  const materialOptions = [
    { value: "180 Gsm Printed", label: "180 Gsm Printed", priceAdjustment: 299},
    { value: "180 Gsm Plain", label: "180 Gsm Plain", priceAdjustment: 199 },
    { value: "210 Gsm Printed", label: "210 Gsm Printed", priceAdjustment: 399 },
    { value: "210 Gsm Plain", label: "210 Gsm Plain", priceAdjustment: 249 },
    { value: "280 Gsm  Printed", label: "280 Gsm Printed", priceAdjustment: 999 },
    { value: "280 Gsm Plain", label: "280 Gsm Plain", priceAdjustment: 699 },
  ]

  const colorOptions = [
    { value: "white", label: "White", priceAdjustment: 0, hex: "#ffffff" },
    { value: "black", label: "Black", priceAdjustment: 0, hex: "#000000" },
    { value: "navy", label: "Navy Blue", priceAdjustment: 0, hex: "#000080" },
    { value: "red", label: "Red", priceAdjustment: 0, hex: "#ff0000" },
    { value: "green", label: "Green", priceAdjustment: 0, hex: "#008000" },
    { value: "purple", label: "Purple", priceAdjustment: 1, hex: "#800080" },
    { value: "pink", label: "Pink", priceAdjustment: 1, hex: "#ffc0cb" },
    { value: "yellow", label: "Yellow", priceAdjustment: 1, hex: "#ffff00" },
  ]

  // const fontOptions = [
  //   { value: "Arial", label: "Arial", priceAdjustment: 0 },
  //   { value: "Helvetica", label: "Helvetica", priceAdjustment: 0 },
  //   { value: "Times New Roman", label: "Times New Roman", priceAdjustment: 0 },
  //   { value: "Courier New", label: "Courier New", priceAdjustment: 0 },
  //   { value: "Verdana", label: "Verdana", priceAdjustment: 0 },
  //   { value: "Georgia", label: "Georgia", priceAdjustment: 1 },
  //   { value: "Comic Sans MS", label: "Comic Sans", priceAdjustment: 1 },
  //   { value: "Impact", label: "Impact", priceAdjustment: 1 },
  // ]

  // Calculate price based on customizations
  useEffect(() => {
    if (!product) return

    let newPrice = product.price

    // Add price adjustments for size (only for wearable items)
    if (["tshirt", "jersey", "hoodie", "clothing", "headwear"].includes(product.category)) {
      const selectedSize = sizeOptions.find((size) => size.value === customizedProduct.size)
      if (selectedSize) {
        newPrice += selectedSize.priceAdjustment
      }
    }

        // Add price adjustments for material (only for wearable items)
    if (["tshirt", "jersey", "hoodie", "clothing", "headwear"].includes(product.category)) {
      const selectedMaterial = materialOptions.find((mat) => mat.value === customizedProduct.material)
      if (selectedMaterial) {
        newPrice += selectedMaterial.priceAdjustment
      }
    }

    // Add price adjustments for color (if applicable)
    if (product.category !== "stationery") {
      const selectedColor = colorOptions.find((color) => color.value === customizedProduct.color)
      if (selectedColor) {
        newPrice += selectedColor.priceAdjustment
      }
    }

    // Add price adjustments for font (if text is used)
    // if (customizedProduct.customText.trim().length > 0) {
    //   const selectedFont = fontOptions.find((font) => font.value === customizedProduct.customFont)
    //   if (selectedFont) {
    //     newPrice += selectedFont.priceAdjustment
    //   }
    // }

    // Add price for custom image
    if (customizedProduct.customImage) {
      newPrice += 5 // $5 extra for custom image
    }

    // Add price for custom text
    if (customizedProduct.customText.trim().length > 0) {
      newPrice += 3 // $3 extra for custom text
    }

    // Add price for jersey name and number
    if (product.category === "jersey") {
      if (customizedProduct.jerseyName.trim().length > 0) {
        newPrice += 4 // $4 extra for jersey name
      }
      if (customizedProduct.jerseyNumber.trim().length > 0) {
        newPrice += 2 // $2 extra for jersey number
      }
    }

    // Multiply by quantity
    newPrice *= customizedProduct.quantity

    // Update total price
    setCustomizedProduct((prev) => ({
      ...prev,
      totalPrice: newPrice,
    }))
  }, [
    product,
    customizedProduct.size,
    customizedProduct.material,
    customizedProduct.color,
    customizedProduct.customImage,
    customizedProduct.customText,
    // customizedProduct.customFont,
    customizedProduct.jerseyName,
    customizedProduct.jerseyNumber,
    customizedProduct.quantity,
  ])

  const handleSizeChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      size: e.target.value,
    })
  }
  const handleMaterialChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      material: e.target.value,
    })
  }
  const handleColorChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      color: e.target.value,
    })
  }

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setCustomizedProduct({
  //       ...customizedProduct,
  //       customImage: file,
  //     })

  //     // Create preview URL
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setCustomizedProduct({
        ...customizedProduct,
        customImage: {
          fileName: file.name,
          fileData: reader.result, // Base64 string
        },
      });
    };
    reader.readAsDataURL(file);
  }
};

  const handleTextChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      customText: e.target.value,
    })
  }

  const handleJerseyNameChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      jerseyName: e.target.value,
    })
  }

  const handleJerseyNumberChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setCustomizedProduct({
      ...customizedProduct,
      jerseyNumber: value,
    })
  }

  // const handleFontChange = (e) => {
  //   setCustomizedProduct({
  //     ...customizedProduct,
  //     customFont: e.target.value,
  //   })
  // }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setCustomizedProduct({
        ...customizedProduct,
        quantity: value,
      })
    }
  }

  const handleNotesChange = (e) => {
    setCustomizedProduct({
      ...customizedProduct,
      notes: e.target.value,
    })
  }

  const handleAddToCart = () => {
    // Create a unique identifier for the customized product
     const uniqueId = `${product.id}-${customizedProduct.size}-${customizedProduct.material}-${customizedProduct.color}-${customizedProduct.customImage?.name || ''}-${customizedProduct.customText}-${customizedProduct.jerseyName}-${customizedProduct.jerseyNumber}-${customizedProduct.notes}`;
    
    // Add the unique ID to the customized product object
    const productToAdd = {
     ...customizedProduct,
     uniqueId: uniqueId,
         baseProductId: product.id, // Keep the original product ID if needed
     };

 
    
   // Add to cart with the unique identifier
    addToCart(productToAdd);
    
    // Navigate to cart
    navigate("/cart");
     };

  const handleCancel = () => {
    navigate("/shop")
  }

  // Determine which customization options to show based on product category
  const showSizeOption = ["tshirt", "jersey", "hoodie", "clothing","headwear"].includes(product?.category)
  const showMaterialOption = ["tshirt", "jersey", "hoodie", "clothing"].includes(product?.category)
  const showColorOption =["tshirt", "jersey", "hoodie", "clothing", "headwear"].includes(product?.category)
  const showTextOption = ["tshirt", "hoodie", "jersey", "mug", "bag", "accessory"].includes(product?.category)
  const showImageOption = ["tshirt", "jersey", "hoodie", "clothing", "stationery","keychain", "headwear"].includes(product?.category)
  const showJerseyOptions = product?.category === "jersey"

  if (!product) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="customization-container">
      <div className="customization-header">
        <h1>Customize Your {product.name}</h1>
        <p>Make it uniquely yours with our customization options</p>
      </div>

      <div className="customization-content">
        <div className="product-preview">
          <div className="preview-container" style={{ backgroundColor: customizedProduct.color }}>
            <img src={product.image || "/placeholder.svg?height=400&width=400"} alt={product.name} />

            {/* {imagePreview && (
              <div className="custom-image-overlay">
                <img src={imagePreview || "/placeholder.svg"} alt="Custom design" />
              </div>
            )}

            {customizedProduct.customText && (
              <div className="custom-text-overlay">
                <p style={{ fontFamily: customizedProduct.customFont }}>{customizedProduct.customText}</p>
              </div>
            )}

            {showJerseyOptions && customizedProduct.jerseyNumber && (
              <div className="jersey-number-overlay">
                <p style={{ fontFamily: customizedProduct.customFont }}>{customizedProduct.jerseyNumber}</p>
              </div>
            )}

            {showJerseyOptions && customizedProduct.jerseyName && (
              <div className="jersey-name-overlay">
                <p style={{ fontFamily: customizedProduct.customFont }}>{customizedProduct.jerseyName.toUpperCase()}</p>
              </div>
            )} */}
          </div>

          <div className="product-info-summary">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <div className="price-display">
              <span className="price-label">Total Price:</span>
              <span className="price-value"> ₹{customizedProduct.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="customization-options">
          <div className="customization-form">
            <h2>Design Options</h2>

            {/* Size Option - Only for wearable items */}
            {showSizeOption && (
              <div className="option-group">
                <label>Size</label>
                <div className="size-options">
                  {sizeOptions.map((size) => (
                    <div key={size.value} className="size-option">
                      <input
                        type="radio"
                        id={`size-${size.value}`}
                        name="size"
                        value={size.value}
                        checked={customizedProduct.size === size.value}
                        onChange={handleSizeChange}
                      />
                      <label htmlFor={`size-${size.value}`} className="size-label">
                        {size.value}
                        {size.priceAdjustment !== 0 && (
                          <span className="price-adjustment">
                            {size.priceAdjustment > 0 ? "+" : ""}₹{Math.abs(size.priceAdjustment).toFixed(2)}
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* Material Option - Only for wearable items */}
            {showMaterialOption && (
              <div className="option-group">
                <label>Material</label>
                <div className="material-options">
                  {materialOptions.map((material) => (
                    <div key={material.value} className="material-option">
                      <input
                        type="radio"
                        id={`material-${material.value}`}
                        name="material"
                        value={material.value}
                        checked={customizedProduct.material === material.value}
                        onChange={(e) =>
                          setCustomizedProduct({
                            ...customizedProduct,
                            material: e.target.value,
                          })
                        }
                      />
                      <label htmlFor={`material-${material.value}`} className="material-label">
                        {material.label}
                        {material.priceAdjustment !== 0 && (
                          <span className="price-adjustment">
                            {material.priceAdjustment > 0 ? "+" : ""}₹{material.priceAdjustment.toFixed(2)}
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Color Option - For most items */}
            {showColorOption && (
              <div className="option-group">
                <label>Color</label>
                <div className="color-options">
                  {colorOptions.map((color) => (
                    <div key={color.value} className="color-option">
                      <input
                        type="radio"
                        id={`color-${color.value}`}
                        name="color"
                        value={color.value}
                        checked={customizedProduct.color === color.value}
                        onChange={handleColorChange}
                      />
                      <label
                        htmlFor={`color-${color.value}`}
                        className="color-label"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="color-name">{color.label}</span>
                        {color.priceAdjustment !== 0 && (
                          <span className="price-adjustment">+₹{color.priceAdjustment.toFixed(2)}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Option - For most items */}
            {showImageOption && (
              <div className="option-group">
                <label>Upload Your Design (less than 10mb)</label>
                <div className="file-upload">
                  <input type="file" id="design-upload" accept="image/*" onChange={handleImageUpload} />
                  <label htmlFor="design-upload" className="upload-button">
                    Choose File
                  </label>
                  <span className="file-name">
                    {customizedProduct.customImage ? customizedProduct.customImage.name : "No file chosen"}
                  </span>
                </div>
              </div>
            )}

            {/* Text Option - For items that can have text */}
            {showTextOption && !showJerseyOptions && (
              <div className="option-group">
                <label>Add Custom Text (+₹3.00)</label>
                <input
                  type="text"
                  placeholder="Enter your text here"
                  value={customizedProduct.customText}
                  onChange={handleTextChange}
                  className="text-input"
                />

                {/* <label>Font Style</label>
                <select value={customizedProduct.customFont} onChange={handleFontChange} className="select-input">
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.label} {font.priceAdjustment > 0 ? `(+₹${font.priceAdjustment.toFixed(2)})` : ""}
                    </option>
                  ))}
                </select> */}
              </div>
            )}

            {/* Jersey-specific options */}
            {showJerseyOptions && (
              <div className="option-group jersey-options">
                <h3>Jersey Customization</h3>
                <div className="jersey-name-input">
                  <label>Name on Jersey (+₹4.00)</label>
                  <input
                    type="text"
                    placeholder="Enter name for back of jersey"
                    value={customizedProduct.jerseyName}
                    onChange={handleJerseyNameChange}
                    className="text-input"
                    maxLength={15}
                  />
                </div>
                <div className="jersey-number-input">
                  <label>Number on Jersey (+₹2.00)</label>
                  <input
                    type="text"
                    placeholder="Enter number (0-99)"
                    value={customizedProduct.jerseyNumber}
                    onChange={handleJerseyNumberChange}
                    className="text-input"
                    maxLength={2}
                  />
                </div>
                {/* <label>Font Style</label>
                <select value={customizedProduct.customFont} onChange={handleFontChange} className="select-input">
                  {fontOptions.map((font) => (
                    <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                      {font.label} {font.priceAdjustment > 0 ? `(+$${font.priceAdjustment.toFixed(2)})` : ""}
                    </option>
                  ))}
                </select> */}
              </div>
            )}

            {/* Quantity - For all items */}
            <div className="option-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={customizedProduct.quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </div>

            {/* Notes - For all items */}
            <div className="option-group">
              <label>Additional Notes</label>
              <textarea
                placeholder="Any special instructions for your order?"
                value={customizedProduct.notes}
                onChange={handleNotesChange}
                className="notes-input"
              ></textarea>
            </div>

            <div className="order-summary-mobile">
              <h3>Order Summary</h3>
              <div className="summary-price">
                <span>Total:</span>
                <span>₹{customizedProduct.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCustomization
