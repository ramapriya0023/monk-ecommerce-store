import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";

const ProductsListContainer = ({
  productsList,
  onDiscountChange,
  onRemoveProduct,
}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productsList);
    console.log({ productsList });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ProductList />
    </div>
  );
};

export default ProductsListContainer;
