import React, { useContext, useState, useEffect } from "react";
import "./css/shopcategory.css";
import { Shopcontext } from "../context/Shopcontext";
import sort_icon from "../assets/Assets/Frontend_Assets/sort_icon.png";
import Item from "../components/item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);
  const [sortOrder, setSortOrder] = useState("default");
  const [priceRange, setPriceRange] = useState(100000); // Default to max
  const [tempPriceRange, setTempPriceRange] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let products = all_product.filter(
      (item) => item.category === props.category && item.new_price <= priceRange
    );

    // Advanced Sorting Logic
    if (sortOrder === "low-high") {
      products.sort((a, b) => a.new_price - b.new_price);
    } else if (sortOrder === "high-low") {
      products.sort((a, b) => b.new_price - a.new_price);
    } else if (sortOrder === "newest") {
      products.sort((a, b) => b.id - a.id); // Higher ID = Newer
    }
    // Featured, Review, Best Sellers mocked with default or slight variations if metadata exists

    setFilteredProducts(products);
  }, [all_product, props.category, priceRange, sortOrder]);

  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
    setShowFilters(false);
  };

  const resetPriceFilter = () => {
    setTempPriceRange(100000);
    setPriceRange(100000);
    setShowFilters(false);
  };

  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="" />

      <div className="shopcategory-header">
        <p>
          <span>Showing {filteredProducts.length}</span> out of {all_product.filter(p => p.category === props.category).length} products
        </p>
        <div className="filter-sort-container">
          <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
            Filter & Sort <img src={sort_icon} alt="" />
          </button>

          {showFilters && (
            <div className="filter-dropdown">
              <div className="filter-group">
                <label>Sort By</label>
                <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                  <option value="default">Featured</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="review">Avg. Customer Review</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="bestseller">Best Sellers</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range: $0 - ${tempPriceRange.toLocaleString()}</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={tempPriceRange}
                  onChange={(e) => setTempPriceRange(Number(e.target.value))}
                />
                <div className="filter-actions">
                  <button className="apply-btn" onClick={applyPriceFilter}>Apply</button>
                  <button className="cancel-btn" onClick={resetPriceFilter}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {filteredProducts.length === 0 && <p className="no-products">No products found matching your filters.</p>}
    </div>
  );
};

export default ShopCategory;
