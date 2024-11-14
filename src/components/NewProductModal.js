import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import SearchBox from "./common/SearchBox";

const initialProducts = [
  {
    id: 77,
    title: "Fog Linen Chambray Towel - Beige Stripe",
    variants: [
      {
        id: 1,
        product_id: 77,
        title: "XS / Silver",
        price: "49",
      },
      {
        id: 2,
        product_id: 77,
        title: "S / Silver",
        price: "49",
      },
      {
        id: 3,
        product_id: 77,
        title: "M / Silver",
        price: "49",
      },
    ],
    image: {
      id: 266,
      product_id: 77,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
    },
  },
  {
    id: 80,
    title: "Orbit Terrarium - Large",
    variants: [
      {
        id: 64,
        product_id: 80,
        title: "Default Title",
        price: "109",
      },
    ],
    image: {
      id: 272,
      product_id: 80,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
    },
  },
];

const StyledDialog = styled(Dialog)({
  padding: "0px",
});

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const TitleText = styled("div")({
  fontSize: "18px",
  fontWeight: 500,
});

const CloseButton = styled("div")({
  cursor: "pointer",
});

const StyledDialogContent = styled(DialogContent)({
  "&.MuiDialogContent-root": {
    padding: "0px",
  },
});

const SearchContainer = styled("div")({
  padding: "20px 30px 20px 30px",
});

const ProductContainer = styled("div")({
  padding: "8px 8px 8px 28px",
});

const ProductLabel = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "14px",
});

const ProductTitle = styled("div")({
  fontSize: "16px",
  fontWeight: 400,
});

const VariantContainer = styled("div")({
  padding: "10px 10px 10px 70px",
});

const VariantLabel = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "410px",
});

const VariantText = styled("div")({
  fontSize: "16px",
  fontWeight: 400,
});

const ActionButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  color: theme.palette.grey[500],
}));

const AddButton = styled(Button)({
  background: "#008060",
});

const NewProductModal = ({ open, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const handleProductChange = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [variantId]: !prev[productId]?.[variantId],
      },
    }));
  };

  return (
    <StyledDialog open={open} maxWidth="sm" onClose={onClose} fullWidth>
      <StyledDialogTitle>
        <TitleText>Select Products</TitleText>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      <StyledDialogContent dividers>
        <SearchContainer>
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </SearchContainer>
        <Divider />
        <FormGroup>
          {initialProducts.map((product, index) => (
            <div key={product.id}>
              <ProductContainer>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductChange(product.id)}
                      sx={{
                        color: "#008060",
                        "&.Mui-checked": {
                          color: "#008060",
                        },
                      }}
                    />
                  }
                  label={
                    <ProductLabel>
                      <Avatar
                        alt={product.title}
                        src={product.image.src}
                        sx={{ width: 56, height: 56 }}
                      />
                      <ProductTitle>{product.title}</ProductTitle>
                    </ProductLabel>
                  }
                />
              </ProductContainer>
              <Divider />
              <div>
                {product.variants.map((variant, idx) => (
                  <div key={variant.id}>
                    <VariantContainer>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedVariants[product.id]?.[variant.id] ||
                              false
                            }
                            sx={{
                              color: "#008060",
                              "&.Mui-checked": {
                                color: "#008060",
                              },
                            }}
                            onChange={() =>
                              handleVariantChange(product.id, variant.id)
                            }
                          />
                        }
                        label={
                          <VariantLabel>
                            <VariantText>{variant.title}</VariantText>
                            <div style={{ display: "flex", gap: "36px" }}>
                              <VariantText>0 available</VariantText>
                              <VariantText>${variant.price}</VariantText>
                            </div>
                          </VariantLabel>
                        }
                      />
                    </VariantContainer>
                    {idx < product.variants.length - 1 && <Divider />}
                  </div>
                ))}
              </div>
              {index < initialProducts.length - 1 && <Divider />}
            </div>
          ))}
        </FormGroup>
      </StyledDialogContent>
      <DialogActions>
        <ActionButton variant="outlined" onClick={onClose}>
          Cancel
        </ActionButton>
        <AddButton variant="contained">Add</AddButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default NewProductModal;
