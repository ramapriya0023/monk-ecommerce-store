import { styled, Typography } from "@mui/material";
import ProductList from "./components/ProductList";
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
      <ProductsListContainer />
    </Container>
  );
};

export default MainLayoutPage;
