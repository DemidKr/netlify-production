import { useSortable } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type DraggableTaskWrapperProps = {
  id: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export const DraggableTaskWrapper = ({
  id,
  children,
  hidden,
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
        width: "100%",
        height: hidden ? 0 : "fit-content",
        borderRadius: "16px",
        background: "#FFF",
        padding: hidden ? 0 : "20px",
        mb: hidden ? 0 : "20px",
        userSelect: "none",
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
