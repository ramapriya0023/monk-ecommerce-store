import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Card, IconButton, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import DropdownSelect from "./common/DropdownSelect";
import Input from "./common/Input";
import { dragHandleColor } from "../constants/colors";

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

const SortableVariantRow = ({ variant, updateProduct }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant.id });
  const [discountValue, setDiscountValue] = useState(0);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    updateProduct("variant", variant.id, "discountValue", discountValue);
  }, [discountValue]);

  return (
    <VariantRow ref={setNodeRef} style={style} {...attributes}>
      <DragHandle {...listeners}>
        <DragIndicatorIcon sx={{ color: dragHandleColor }} />
      </DragHandle>
      <VariantCard>
        <div>{variant.title}</div>
      </VariantCard>
      <DiscountContainer>
        <DiscountValueCard>
          <Input
            value={discountValue}
            type="number"
            onChange={(event) => {
              setDiscountValue(event.target.value);
            }}
          />
        </DiscountValueCard>
        <Card sx={{ borderRadius: "30px" }}>
          <DropdownSelect
            value={variant.discountType || "% Off"}
            options={["% Off", "Flat Off"]}
            onChange={(event) =>
              updateProduct(
                "variant",
                variant.id,
                "discountType",
                event.target.value
              )
            }
          />
        </Card>
      </DiscountContainer>
      <IconButton
        onClick={() => updateProduct("variant", variant.id, "delete")}
      >
        <CloseIcon />
      </IconButton>
    </VariantRow>
  );
};

const ProductVariants = ({ product, updateProduct }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = product.variants.findIndex(
        (variant) => variant.id === active.id
      );
      const newIndex = product.variants.findIndex(
        (variant) => variant.id === over.id
      );

      const updatedVariants = arrayMove(product.variants, oldIndex, newIndex);

      updateProduct("product", product.id, "variants", updatedVariants);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={product.variants.map((variant) => variant.id)}
        strategy={verticalListSortingStrategy}
      >
        {product.variants.map((variant) => (
          <SortableVariantRow
            key={variant.id}
            variant={variant}
            updateProduct={updateProduct}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ProductVariants;
