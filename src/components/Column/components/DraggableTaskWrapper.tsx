import { useSortable } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableTaskWrapperProps = {
  id: string;
  children: React.ReactNode;
};

export const DraggableTaskWrapper = ({
  id,
  children,
}: DraggableTaskWrapperProps) => {
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
      sx={{
        width: "calc(100% - 40px)",
        height: "fit-content",
        borderRadius: "16px",
        background: "#FFF",
        padding: "20px",
      }}
    >
      <div
        style={{
          transition,
          position: "relative",
          transform: CSS.Transform.toString(transform),
          opacity: isDragging ? 0.3 : 1,
        }}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {children}
      </div>
    </Box>
  );
};
