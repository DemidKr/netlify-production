import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";

type DraggableColumnWrapperProps = {
  id: string;
  children: React.ReactNode;
};

export const DraggableColumnWrapper = ({
  id,
  children,
}: DraggableColumnWrapperProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <Box
      style={{
        transition,
        position: "relative",
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.3 : 1,
      }}
      sx={{
        width: "354px",
        height: "fit-content",
        borderRadius: "16px",
        background: "#F5F5F5",
        padding: "20px",
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
};
