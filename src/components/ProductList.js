import React, { useState } from "react";
import ProductItem from "./ProductItem";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import NewProductModal from "./NewProductModal";
import { primaryColor } from "../constants/colors";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
    console.log({ editingIndex });
    setEditingProductIndex(editingIndex);
    setShowAddModal(true);
  };

  const handleAddSelectedProducts = (newSelectedProducts) => {
    console.log({ newSelectedProducts });

    newSelectedProducts.map((product) => ({
      id: products.length + 1,
      title: product.title,
      discountType: "% Off",
      discountValue: 0,
      variants: [
        product.variants.map((variant, index) => ({
          title: variant.title,
          id: `${products.length + 1}-${index + 1}`,
          discountType: "% Off",
          discountValue: 0,
        })),
      ],
    }));

    console.log({ newSelectedProducts, editingProductIndex, products });

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];

      updatedProducts.splice(editingProductIndex, 1, ...newSelectedProducts);

      console.log({ updatedProducts });

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
    <div
      style={{
        padding: "20px",
        width: "600px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
                    setProducts(products.filter((p) => p.id !== product.id))
                  }
                  onEdit={() => handleEditProduct(index)}
                  updateProduct={handleUpdateProduct}
                />
                <Divider variant="inset" />
              </React.Fragment>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          onClick={addProduct}
          sx={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
        >
          Add Product
        </Button>
      </div>

      <NewProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        addSelectedProducts={(selectedProducts) =>
          handleAddSelectedProducts(selectedProducts)
        }
      />
    </div>
  );
};

export default ProductList;
