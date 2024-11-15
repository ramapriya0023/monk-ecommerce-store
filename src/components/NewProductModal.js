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
  Skeleton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import SearchBox from "./common/SearchBox";
import { fetchProducts } from "../services/ProductsAPIService";
import debounce from "lodash.debounce";
import { primaryColor } from "../constants/colors";

const StyledDialog = styled(Dialog)({
  padding: "0px",
  overflow: "hidden",
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
  display: "flex",
  flexDirection: "column",
  padding: "0px",
  overflow: "hidden",
});

const SearchContainer = styled("div")({
  padding: "20px 30px",
  flex: "none",
});

const ProductsContainer = styled("div")({
  flex: "1",
  overflowY: "auto",
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
  background: primaryColor,
  color: "#fff",
  "&:hover": {
    background: "#006750",
  },
});

const NewProductModal = ({ open, onClose, addSelectedProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const loadProducts = useCallback(async (search = "", page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(search, page, 10);
      console.log({ data });
      setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
      setIsDataFetched(true);
    }
  }, []);

  const debouncedLoadProducts = useCallback(
    debounce((search, page) => {
      loadProducts(search, page);
    }, 500),
    [loadProducts]
  );

  useEffect(() => {
    if (open) {
      setProducts([]);
      setPage(1);
      debouncedLoadProducts(searchValue, 1);
    }

    return () => {
      setIsDataFetched(false);
    };
  }, [open, searchValue, debouncedLoadProducts]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = loading ? "hidden" : "auto";
    }
  }, [loading]);

  useEffect(() => {
    if (page > 1) {
      loadProducts(searchValue, page);
    }
  }, [page, searchValue, loadProducts]);

  const handleProductChange = (productId) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === productId);
      if (isSelected) {
        return prev.filter((p) => p.id !== productId);
      } else {
        const product = products.find((p) => p.id === productId);
        return [...prev, { ...product, variants: [...product.variants] }];
      }
    });
  };

  const handleVariantChange = (productId, variantId) => {
    setSelectedProducts((prev) => {
      const productIndex = prev.findIndex((p) => p.id === productId);
      const product = products.find((p) => p.id === productId);
      if (productIndex === -1) {
        const variant = product.variants.find((v) => v.id === variantId);
        return [...prev, { ...product, variants: [variant] }];
      } else {
        const updatedVariants = prev[productIndex].variants.some(
          (v) => v.id === variantId
        )
          ? prev[productIndex].variants.filter((v) => v.id !== variantId)
          : [
              ...prev[productIndex].variants,
              product.variants.find((v) => v.id === variantId),
            ];

        if (updatedVariants.length === 0) {
          return prev.filter((_, index) => index !== productIndex);
        }

        return prev.map((p, index) =>
          index === productIndex ? { ...p, variants: updatedVariants } : p
        );
      }
    });
  };

  const isProductChecked = (productId) => {
    const product = selectedProducts.find((p) => p.id === productId);
    return (
      product?.variants.length ===
      products.find((p) => p.id === productId)?.variants.length
    );
  };

  const isProductIndeterminate = (productId) => {
    const product = selectedProducts.find((p) => p.id === productId);
    return (
      product?.variants.length > 0 &&
      product.variants.length <
        products.find((p) => p.id === productId)?.variants.length
    );
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  console.log({ selectedProducts });
  return (
    <StyledDialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        onClose();
        setSelectedProducts([]);
        setSearchValue("");
      }}
      fullWidth
    >
      <StyledDialogTitle>
        <TitleText>Select Products</TitleText>
        <CloseButton
          onClick={() => {
            onClose();
            setSelectedProducts([]);
            setSearchValue("");
          }}
        >
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
        <ProductsContainer
          onScroll={loading ? null : handleScroll}
          ref={containerRef}
        >
          <FormGroup>
            {products?.map((product, index) => (
              <div key={product.id}>
                <ProductContainer>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(isProductChecked(product.id))}
                        indeterminate={Boolean(
                          isProductIndeterminate(product.id)
                        )}
                        onChange={() => handleProductChange(product.id)}
                        sx={{
                          color: primaryColor,
                          "&.Mui-checked": {
                            color: primaryColor,
                          },
                          "&.MuiCheckbox-indeterminate": {
                            color: primaryColor,
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
                              checked={Boolean(
                                selectedProducts
                                  .find((p) => p.id === product.id)
                                  ?.variants.some((v) => v.id === variant.id)
                              )}
                              onChange={() =>
                                handleVariantChange(product.id, variant.id)
                              }
                              sx={{
                                color: primaryColor,
                                "&.Mui-checked": {
                                  color: primaryColor,
                                },
                              }}
                            />
                          }
                          label={
                            <VariantLabel>
                              <VariantText>{variant.title}</VariantText>
                              <div style={{ display: "flex", gap: "36px" }}>
                                <VariantText>
                                  {variant.inventory_quantity || 0} available
                                </VariantText>
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
                {index < products.length - 1 && <Divider />}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton width={550} height={60} />
              </div>
            )}
            {!loading && products?.length === 0 && isDataFetched && (
              <div
                style={{
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Typography align="center">No products found.</Typography>
              </div>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </FormGroup>
        </ProductsContainer>
      </StyledDialogContent>
      <DialogActions
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {selectedProducts.length > 0 && (
            <div>
              {`${selectedProducts.length} ${
                selectedProducts.length === 1 ? "product" : "products"
              } selected`}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <ActionButton variant="outlined" onClick={onClose}>
            Cancel
          </ActionButton>
          <AddButton
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              addSelectedProducts(selectedProducts);
              setSelectedProducts([]);
              setSearchValue("");
              onClose();
            }}
          >
            Add
          </AddButton>
        </div>
      </DialogActions>
    </StyledDialog>
  );
};

export default NewProductModal;
