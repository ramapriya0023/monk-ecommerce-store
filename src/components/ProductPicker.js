import React, { useState, useEffect } from "react";
import { fetchProducts } from "./api";

const ProductPicker = ({ onSelectProducts, onClose }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    const newProducts = await fetchProducts(search, page, 10);
    setProducts((prev) => [...prev, ...newProducts]);
  };

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div onScroll={handleScroll}>
      {products.map((product) => (
        <ProductOption
          key={product.id}
          product={product}
          onSelect={() => onSelectProducts(product)}
        />
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductPicker;
