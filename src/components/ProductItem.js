import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import { Card, styled, Button } from "@mui/material";
import Input from "./common/Input";
import DropdownSelect from "./common/DropdownSelect";
import ProductVariants from "./ProductVariants";
import { primaryColor } from "../constants/colors";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  alignItems: "center",
  justifyContent: "space-between",
});

const ProductTitle = styled("div")(({ isNew }) => ({
  display: "flex",
  alignItems: "center",
  color: isNew && "#00000080",
}));

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

const VariantsContainer = styled("div")({
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  left: "20px",
});

const ProductItem = ({ product, onDelete, onEdit, updateProduct }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const [showVariants, setShowVariants] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log({ showVariants, product });
  return (
    <ProductContainer ref={setNodeRef} style={style} {...attributes}>
      <div>
        <ProductRow>
          <DragHandle {...listeners}>
            <DragIndicatorIcon sx={{ color: "#00000080" }} />
          </DragHandle>
          <ProductCard>
            <ProductTitle isNew={product?.title?.length === 0}>
              {product?.title || "Select product"}
            </ProductTitle>
            <IconButton size="small" onClick={onEdit} sx={{ ml: 1 }}>
              <EditIcon sx={{ fontSize: 18, color: "#00000033" }} />
            </IconButton>
          </ProductCard>
          {showDiscount ? (
            <DiscountContainer>
              <DiscountValueCard>
                <Input
                  value={product?.discountValue || 0}
                  type="number"
                  onChange={(event) =>
                    updateProduct(
                      "product",
                      product.id,
                      "discountValue",
                      event.target.value
                    )
                  }
                />
              </DiscountValueCard>
              <Card>
                <DropdownSelect
                  value={product.discountType || "% Off"}
                  options={["% Off", "Flat Off"]}
                  onChange={(event) => {
                    console.log(event.target.value);
                    updateProduct(
                      "product",
                      product.id,
                      "discountType",
                      event.target.value
                    );
                  }}
                  type="product"
                />
              </Card>
            </DiscountContainer>
          ) : (
            <Button
              variant="contained"
              size="medium"
              onClick={() => setShowDiscount(true)}
              sx={{ background: primaryColor }}
            >
              Add Discount
            </Button>
          )}
          <IconButton
            onClick={onDelete}
            disabled={false}
            sx={{ width: "5px", height: "5px" }}
          >
            <CloseIcon />
          </IconButton>
        </ProductRow>
        {product.variants.length !== 0 && (
          <ToggleVariantsContainer
            onClick={() => setShowVariants(!showVariants)}
          >
            <ToggleVariantsText>
              {showVariants ? "Hide variants" : "Show variants"}
            </ToggleVariantsText>
            {showVariants ? (
              <ExpandLessIcon sx={{ color: "#006EFF" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "#006EFF" }} />
            )}
          </ToggleVariantsContainer>
        )}
      </div>

      {showVariants && product.variants.length > 0 && (
        <VariantsContainer>
          {product.variants.map((variant) => (
            <ProductVariants
              product={product}
              variant={variant}
              updateProduct={updateProduct}
            />
          ))}
        </VariantsContainer>
      )}
    </ProductContainer>
  );
};

export default ProductItem;
