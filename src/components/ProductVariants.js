import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Card, IconButton, styled } from "@mui/material";
import DropdownSelect from "./common/DropdownSelect";
import CloseIcon from "@mui/icons-material/Close";
import Input from "./common/Input";

const VariantRow = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: "5px",
  gap: "12px",
});

const DragHandle = styled("span")({
  cursor: "grab",
  marginRight: "10px",
});

const VariantCard = styled(Card)({
  width: "184px",
  padding: "5px 10px",
  display: "flex",
  borderRadius: "30px",
  alignItems: "center",
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
  borderRadius: "30px",
});

const ProductVariants = ({ product, variant, updateProduct }) => {
  return (
    <VariantRow key={variant.id}>
      <DragHandle>
        <DragIndicatorIcon sx={{ color: "#00000080" }} />
      </DragHandle>
      <VariantCard>
        <div>{variant.title}</div>
      </VariantCard>
      <DiscountContainer>
        <DiscountValueCard>
          <Input
            value={product.discountValue}
            type="number"
            onChange={(event) => {
              updateProduct(
                "variant",
                variant.id,
                "discountValue",
                event.target.value
              );
            }}
          />
        </DiscountValueCard>
        <Card sx={{ borderRadius: "30px" }}>
          <DropdownSelect
            value={product.discountType || "% Off"}
            options={["% Off", "Flat Off"]}
            onChange={(event) => {
              console.log(event.target.value);
              updateProduct(
                "variant",
                variant.id,
                "discountType",
                event.target.value
              );
            }}
            type="variant"
          />
        </Card>
      </DiscountContainer>
      <IconButton
        onClick={() => {
          updateProduct("variant", variant.id, "delete");
        }}
      >
        <CloseIcon />
      </IconButton>
    </VariantRow>
  );
};

export default ProductVariants;
