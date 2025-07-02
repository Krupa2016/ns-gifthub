"use client"

import { useState } from "react"
import "../styles/FilterBar.css"

const FilterBar = ({ categories, activeCategory, onCategoryChange, sortOptions, activeSortOption, onSortChange }) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar-container">
        <button className="mobile-filter-toggle" onClick={toggleMobileFilter}>
          Filters & Sort
          <span className={`toggle-icon ${isMobileFilterOpen ? "open" : ""}`}>▼</span>
        </button>

        <div className={`filter-content ${isMobileFilterOpen ? "open" : ""}`}>
          <div className="categories">
            <h3>Categories</h3>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => onCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-options">
            <h3>Sort By</h3>
            <select value={activeSortOption} onChange={(e) => onSortChange(e.target.value)} className="sort-select">
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
