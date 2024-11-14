import { styled, Typography } from "@mui/material";
import ProductList from "./components/ProductList";
import { defaultProductList, fetchProducts } from "./utils/api";
import ProductsListContainer from "./components/ProductsListContainer";

const Container = styled("Paper")({
  display: "flex",
  justifyContent: "center",
  height: "85vh",
  width: "90vw",
  padding: "50px",
  flexDirection: "column",
});

const MainLayoutPage = () => {
  return (
    <Container>
      <ProductsListContainer
        productsList={defaultProductList}
        onDiscountChange={() => {
          console.log("onDiscountchange");
        }}
        onRemoveProduct={() => console.log("on remove product")}
      />
    </Container>
  );
};

export default MainLayoutPage;
