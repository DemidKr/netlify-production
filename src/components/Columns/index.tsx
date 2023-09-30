import { Column, type ColumnType } from "../Column";
import { Box } from "@mui/material";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { TaskType } from "../../entities";
import { arrayMove } from "@dnd-kit/sortable";
import { Card } from "../Column/components/Card";

type ColumnsProps = {
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

export const Columns = ({ columns, setColumns }: ColumnsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const findActiveTask = (activeId: string) => {
    const activeColumn = columns.find((column) =>
      column.tasks.some((task) => task.id === activeId),
    );

    return activeColumn?.tasks?.find((task) => task.id === activeId);
  };

  const activeTask = findActiveTask(activeId ?? "");

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeColumnIndex = columns.findIndex((column) =>
        column.tasks.some((task) => task.id === active.id),
      );

      const newColumnIndex = columns.findIndex((column) =>
        column.tasks.some((task) => task.id === over.id),
      );

      const copyColumnsArray = JSON.parse(JSON.stringify(columns));
      const activeTask = findActiveTask(String(active.id ?? ""));
      if (activeTask) {
        if (activeTask.hidden) {
          copyColumnsArray[newColumnIndex].tasks.push(activeTask);
        } else {
          // удаляем старый
          copyColumnsArray[activeColumnIndex].tasks = copyColumnsArray[
            activeColumnIndex
          ].tasks.filter((task: TaskType) => task.id !== activeTask.id);
          // вставляем в новый столбец
          copyColumnsArray[newColumnIndex].tasks.push(activeTask);

          //ищем элемент на который навели в новом столбце
          const newColumnTaskHoverIndex = copyColumnsArray[
            newColumnIndex
          ].tasks.findIndex((task: TaskType) => task.id === over.id);
          if (newColumnTaskHoverIndex !== -1) {
            // перемещает с конца(последний элемент в этом столбце) на место того на который навели
            copyColumnsArray[newColumnIndex].tasks = arrayMove(
              copyColumnsArray[newColumnIndex].tasks,
              copyColumnsArray[newColumnIndex].tasks.length - 1,
              newColumnTaskHoverIndex,
            );
          }
        }
      }

      setColumns(copyColumnsArray);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        alignItems: "flex-start",
        padding: "40px",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {columns.map((column, index) => (
          <Column
            key={column.id}
            currentColumnIndex={index}
            columns={columns}
            currentColumn={column}
            setColumns={setColumns}
          />
        ))}
        <DragOverlay>
          {activeTask != null && (
            <Card task={activeTask} deleteCard={() => {}} />
          )}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};
