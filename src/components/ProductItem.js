import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Card, styled } from "@mui/material";
import Input from "./common/Input";
import DropdownSelect from "./common/DropdownSelect";
import ProductVariants from "./ProductVariants";

const ProductContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "10px",
  flexDirection: "column",
});

const ProductRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const DragHandle = styled("span")({
  cursor: "grab",
  marginRight: "10px",
});

const ProductCard = styled(Card)({
  width: "220px",
  padding: "5px 10px 5px 10px",
  display: "flex",
});

const ProductTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const DiscountContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

const DiscountValueCard = styled(Card)({
  width: "70px",
  height: "31px",
  display: "flex",
  alignItems: "center",
});

const ToggleVariantsContainer = styled("div")({
  cursor: "pointer",
  justifyContent: "flex-end",
  display: "flex",
  alignItems: "center",
});

const ToggleVariantsText = styled("div")({
  textDecorationLine: "underline",
  fontSize: "12px",
  textDecorationColor: "#006EFF",
  color: "#006EFF",
});

const ProductItem = ({ product, dragHandleProps, onDelete }) => {
  const [showVariants, setShowVariants] = useState(false);

  return (
    <ProductContainer>
      <div>
        <ProductRow>
          <DragHandle {...dragHandleProps}>
            <DragIndicatorIcon sx={{ color: "#00000080" }} />
          </DragHandle>
          <ProductCard>
            <ProductTitle>{product.name}</ProductTitle>
          </ProductCard>
          <DiscountContainer>
            <DiscountValueCard>
              <Input value={product.discountValue} type="number" />
            </DiscountValueCard>
            <Card>
              <DropdownSelect
                value={product.discountType}
                options={["% Off", "Flat Off"]}
                onChange={(event) => {
                  console.log(event.target.value);
                }}
                type="product"
              />
            </Card>
          </DiscountContainer>
          <IconButton
            onClick={onDelete}
            disabled={false}
            sx={{ width: "5px", height: "5px" }}
          >
            <CloseIcon />
          </IconButton>
        </ProductRow>
        <ToggleVariantsContainer onClick={() => setShowVariants(!showVariants)}>
          <ToggleVariantsText>
            {showVariants ? "Hide variants" : "Show variants"}
          </ToggleVariantsText>
          {showVariants ? (
            <ExpandLessIcon sx={{ color: "#006EFF" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#006EFF" }} />
          )}
        </ToggleVariantsContainer>
      </div>
      {showVariants && product.variants.length > 0 && (
        <ProductVariants product={product} dragHandleProps={dragHandleProps} />
      )}
    </ProductContainer>
  );
};

export default ProductItem;
