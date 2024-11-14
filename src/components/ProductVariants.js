import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Card, IconButton } from "@mui/material";
import DropdownSelect from "./common/DropdownSelect";
import CloseIcon from "@mui/icons-material/Close";

import Input from "./common/Input";

const ProductVariants = ({ product, dragHandleProps }) => {
  return (
    <div
      style={{
        marginLeft: "30px",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {product.variants.map((variant) => (
        <div
          key={variant.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "5px",
            gap: "12px",
          }}
        >
          <span
            {...dragHandleProps}
            style={{ cursor: "grab", marginRight: "10px" }}
          >
            <DragIndicatorIcon sx={{ color: "#00000080" }} />
          </span>
          <Card
            sx={{
              width: "184px",
              padding: "5px 10px 5px 10px",
              display: "flex",
              borderRadius: "30px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {variant.name}
            </div>
          </Card>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Card
              sx={{
                width: "70px",
                height: "31px",
                display: "flex",
                alignItems: "center",
                borderRadius: "30px",
              }}
            >
              <Input value={product.discountValue} type="number" />
            </Card>
            <Card sx={{ borderRadius: "30px" }}>
              <DropdownSelect
                value={product.discountType}
                options={["% Off", "Flat Off"]}
                onChange={(event) => {
                  console.log(event.target.value);
                }}
                type="variant"
              />
            </Card>
          </div>
          <IconButton onClick={() => {}}>
            <CloseIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default ProductVariants;
