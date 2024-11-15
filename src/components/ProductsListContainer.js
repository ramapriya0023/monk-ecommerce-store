import { Typography, Box } from "@mui/material";
import ProductList from "./ProductList";
import { styled } from "@mui/system";

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
  gap: "170px",
  marginLeft: "200px",
});

const HeaderText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 500,
});

const ProductsListContainer = ({}) => {
  return (
    <Container>
      <InnerContainer>
        <Title>Add Products</Title>
        <HeaderRow>
          <HeaderText>Product</HeaderText>
          <HeaderText>Discount</HeaderText>
        </HeaderRow>
        <ProductList />
      </InnerContainer>
    </Container>
  );
};

export default ProductsListContainer;
