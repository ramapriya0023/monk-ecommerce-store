import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Card, styled, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import {
  dragHandleColor,
  primaryColor,
  toggleVariantsColor,
} from "../constants/colors";
import DropdownSelect from "./common/DropdownSelect";
import Input from "./common/Input";
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
  height: "21px",
  padding: "5px 10px 5px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ProductTitle = styled("div")(({ isNew }) => ({
  display: "flex",
  alignItems: "center",
  color: isNew && dragHandleColor,
  overflow: "hidden",
}));

const DiscountContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  width: "180px",
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
  textDecorationColor: toggleVariantsColor,
  color: toggleVariantsColor,
});

const VariantsContainer = styled("div")({
  marginTop: "10px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  left: "20px",
  width: "90%",
});

const ProductItem = ({
  product,
  onDelete,
  onEdit,
  updateProduct,
  products,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const [showVariants, setShowVariants] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountValue, setDiscountValue] = useState(
    product.discountValue || 0
  );
  const [discountType, setDiscountType] = useState(
    product.discountType || "% Off"
  );

  useEffect(() => {
    setDiscountValue(0);
  }, [discountType]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    updateProduct("product", product.id, "discountValue", discountValue);
  }, [discountValue]);

  return (
    <ProductContainer ref={setNodeRef} style={style} {...attributes}>
      <div>
        <ProductRow>
          <DragHandle {...listeners}>
            <DragIndicatorIcon sx={{ color: dragHandleColor }} />
          </DragHandle>
          <ProductCard>
            <Tooltip title={product.title} placement="top">
              <ProductTitle isNew={product?.title?.length === 0}>
                {product?.title || "Select product"}
              </ProductTitle>
            </Tooltip>

            <IconButton size="small" onClick={onEdit} sx={{ ml: 1 }}>
              <EditIcon sx={{ fontSize: 18, color: "#00000033" }} />
            </IconButton>
          </ProductCard>
          {showDiscount ? (
            <DiscountContainer>
              <DiscountValueCard>
                <Input
                  value={discountValue}
                  type="number"
                  onChange={(event) => setDiscountValue(event.target.value)}
                  discountType={discountType}
                />
              </DiscountValueCard>
              <Card>
                <DropdownSelect
                  value={discountType}
                  options={["% Off", "Flat Off"]}
                  onChange={(event) => {
                    event.preventDefault();
                    const newDiscountType = event.target.value;
                    setDiscountType(newDiscountType);
                    updateProduct(
                      "product",
                      product.id,
                      "discountType",
                      newDiscountType
                    );
                  }}
                  type="product"
                />
              </Card>
            </DiscountContainer>
          ) : (
            <DiscountContainer>
              <Button
                variant="contained"
                size="medium"
                onClick={() => setShowDiscount(true)}
                sx={{
                  background: primaryColor,
                  textTransform: "none",
                  width: "inherit",
                }}
              >
                Add Discount
              </Button>
            </DiscountContainer>
          )}
          <div>
            {products.length !== 1 && (
              <IconButton
                onClick={onDelete}
                disabled={false}
                sx={{ width: "5px", height: "5px" }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        </ProductRow>
        {product.variants.length > 1 && (
          <ToggleVariantsContainer
            onClick={() => setShowVariants(!showVariants)}
          >
            <ToggleVariantsText>
              {showVariants ? "Hide variants" : "Show variants"}
            </ToggleVariantsText>
            {showVariants ? (
              <ExpandLessIcon sx={{ color: toggleVariantsColor }} />
            ) : (
              <ExpandMoreIcon sx={{ color: toggleVariantsColor }} />
            )}
          </ToggleVariantsContainer>
        )}
      </div>

      {showVariants && product.variants.length > 1 && (
        <VariantsContainer>
          <ProductVariants
            product={product}
            updateProduct={updateProduct}
            showDiscount={showDiscount}
          />
        </VariantsContainer>
      )}
    </ProductContainer>
  );
};

export default ProductItem;
