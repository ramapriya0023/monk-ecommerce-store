import React, { useState } from "react";
import ProductItem from "./ProductItem";
import Button from "@mui/material/Button";
import { Divider, styled } from "@mui/material";
import AddNewProductsModal from "./AddNewProductsModal";
import { primaryColor } from "../constants/colors";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ProductsContainer = styled("div")({
  padding: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const StyledButton = styled(Button)({
  borderColor: primaryColor,
  color: primaryColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  textTransform: "none",
});

const ButtonContainer = styled("div")({
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "",
      discountType: "% Off",
      discountValue: 0,
      variants: [],
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = products.findIndex(
        (product) => product.id === active.id
      );
      const newIndex = products.findIndex((product) => product.id === over.id);
      setProducts((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const addProduct = () => {
    const newProduct = {
      id: `${products.length + 1}`,
      title: "",
      discountType: "% Off",
      discountValue: 0,
      variants: [],
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (editingIndex) => {
    setEditingProductIndex(editingIndex);
    setShowAddModal(true);
  };

  const handleAddSelectedProducts = (newSelectedProducts) => {
    let finalPr = newSelectedProducts.map((product) => ({
      id: products.length + 1,
      title: product.title,
      discountType: "% Off",
      discountValue: 0,
      variants: [
        ...product.variants.map((variant, index) => ({
          title: variant.title,
          id: `${products.length + 1}-${index + 1}`,
          discountType: "% Off",
          discountValue: 0,
        })),
      ],
    }));

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(editingProductIndex, 1, ...finalPr);
      return updatedProducts;
    });

    setEditingProductIndex(null);
    setShowAddModal(false);
  };

  const handleUpdateProduct = (type, id, toUpdate, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (type === "product" && product.id === id) {
          return {
            ...product,
            [toUpdate]: value,
          };
        }

        if (type === "variant") {
          if (toUpdate === "delete") {
            const updatedVariants = product.variants.filter(
              (variant) => variant.id !== id
            );
            return {
              ...product,
              variants: updatedVariants,
            };
          }

          const updatedVariants = product.variants.map((variant) => {
            if (variant.id === id) {
              return {
                ...variant,
                [toUpdate]: value,
              };
            }
            return variant;
          });

          return {
            ...product,
            variants: updatedVariants,
          };
        }

        return product;
      })
    );
  };

  return (
    <ProductsContainer>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={products}
          strategy={verticalListSortingStrategy}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                <ProductItem
                  product={product}
                  onDelete={() =>
                    products.length > 1 &&
                    setProducts(products.filter((p) => p.id !== product.id))
                  }
                  onEdit={() => handleEditProduct(index)}
                  updateProduct={handleUpdateProduct}
                />
                <Divider variant="middle" />
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <ButtonContainer>
        <StyledButton variant="outlined" onClick={addProduct}>
          Add Product
        </StyledButton>
      </ButtonContainer>

      <AddNewProductsModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        addSelectedProducts={(selectedProducts) =>
          handleAddSelectedProducts(selectedProducts)
        }
      />
    </ProductsContainer>
  );
};

export default ProductList;
