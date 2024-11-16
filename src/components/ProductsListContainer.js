import { Typography, Box, Button } from "@mui/material";
import ProductList from "./ProductList";
import { styled } from "@mui/system";
import { useState } from "react";
import { primaryColor } from "../constants/colors";

const Container = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  height: "100%",
});

const InnerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Title = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  marginLeft: "100px",
  marginBottom: "33px",
});

const HeaderRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "180px",
  justifyContent: "center",
});

const HeaderText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 500,
});

const StyledButton = styled(Button)({
  borderColor: primaryColor,
  color: primaryColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  textTransform: "none",
});

const ButtonContainer = styled("div")({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const ProductsListContainer = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "",
      discountType: "% Off",
      discountValue: 0,
      variants: [],
    },
  ]);

  const addProduct = () => {
    const newProduct = {
      id: `${products.length + 1}`,
      title: "",
      discountType: "% Off",
      discountValue: 0,
      variants: [],
    };
    setProducts([...products, newProduct]);
  };

  return (
    <Container>
      <InnerContainer>
        <Title>Add Products</Title>
        <HeaderRow>
          <HeaderText>Product</HeaderText>
          <HeaderText>Discount</HeaderText>
        </HeaderRow>
        <ProductList products={products} setProducts={setProducts} />
        <ButtonContainer>
          <StyledButton variant="outlined" onClick={addProduct}>
            Add Product
          </StyledButton>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default ProductsListContainer;
