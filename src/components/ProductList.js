import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ProductItem from "./ProductItem";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import NewProductModal from "./NewProductModal";

const initialProducts = [
  {
    id: "1",
    name: "Cotton classic sneaker",
    discountType: "% Off",
    discountValue: 20,
    variants: [
      { id: "1-1", name: "Cotton classic sneaker" },
      { id: "1-2", name: "Cotton classic sneaker" },
    ],
  },
  {
    id: "2",
    name: "Cotton classic sneaker",
    discountType: "% Off",
    discountValue: 20,
    variants: [],
  },
  // Additional products can be added here
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedProducts = Array.from(products);
    const [movedProduct] = reorderedProducts.splice(result.source.index, 1);
    reorderedProducts.splice(result.destination.index, 0, movedProduct);
    setProducts(reorderedProducts);
  };

  const addProduct = () => {
    // const newProduct = {
    //   id: `${products.length + 1}`,
    //   name: "New Product",
    //   discountType: "% Off",
    //   discountValue: 20,
    //   variants: [],
    // };
    // setProducts([...products, newProduct]);

    setShowAddModal(true);
  };

  return (
    <div style={{ padding: "20px", width: "600px" }}>
      <h2>Add Products</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="product-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {products.map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={String(product.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ marginBottom: "10px" }}
                    >
                      <ProductItem
                        product={product}
                        index={index}
                        onDelete={() =>
                          setProducts(
                            products.filter((p) => p.id !== product.id)
                          )
                        }
                      />
                      <Divider sx={{ marginBottom: "20px" }} variant="middle" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button variant="outlined" onClick={addProduct}>
        Add Product
      </Button>

      <NewProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};

export default ProductList;
