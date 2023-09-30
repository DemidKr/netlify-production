import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { TaskType } from "../../entities";
import { DraggableColumnWrapper } from "./components/DraggableColumnWrapper";
import { DraggableTaskWrapper } from "./components/DraggableTaskWrapper";
import { Status } from "./components/Status";
import { CardMenu } from "./components/CardMenu";
import { BackgroundLetterAvatars } from "../BackgroundLetterAvatars";
import { Stack } from "@mui/material";

export type ColumnType = {
  id: string;
  name: string;
  tasks: TaskType[];
  color: string;
};

type ColumnProps = {
  columns: ColumnType[];
  currentColumn: ColumnType;
  currentColumnIndex: number;
  setColumns: (columns: ColumnType[]) => void;
};

export const Column = ({
  columns,
  currentColumn,
  currentColumnIndex,
  setColumns,
}: ColumnProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTask = currentColumn.tasks.find((task) => task.id === activeId);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const deleteTaskHandler = (deleteIndex: number) => {
    const deletedTaskArray = currentColumn.tasks.filter(
      (_column, index) => index !== deleteIndex,
    );
    const copyColumnsArray = JSON.parse(JSON.stringify(columns));
    copyColumnsArray[currentColumnIndex].tasks = deletedTaskArray;
    setColumns(copyColumnsArray);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentColumn.tasks.findIndex(
        (item) => item.id === active.id,
      );
      const newIndex = currentColumn.tasks.findIndex(
        (item) => item.id === over.id,
      );
      const newTasksOrder = arrayMove(currentColumn.tasks, oldIndex, newIndex);

      const copyColumnsArray = JSON.parse(JSON.stringify(columns));
      copyColumnsArray[currentColumnIndex].tasks = newTasksOrder;
      setColumns(copyColumnsArray);
    }
  };

  return (
    <DraggableColumnWrapper id={currentColumn.id}>
      <div data-no-dnd="true">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                background: currentColumn.color,
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            />
            <Typography
              component="div"
              sx={{
                color: "#0D062D",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                marginLeft: "8px",
                fontFamily: "Inter",
              }}
            >
              {currentColumn.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#E0E0E0",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                marginLeft: "12px",
                fontFamily: "Inter",
              }}
            >
              {currentColumn.tasks.length}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: currentColumn.color,
            width: "100%",
            height: "2px",
            margin: "20px 0",
          }}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {currentColumn.tasks.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext
              items={currentColumn.tasks}
              strategy={rectSortingStrategy}
            >
              {currentColumn.tasks.map((task, index) => (
                <DraggableTaskWrapper key={task.id} id={task.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Status status={task.status} />
                    <CardMenu deleteCard={() => deleteTaskHandler(index)} />
                  </Box>
                  <Typography
                    component="h3"
                    sx={{
                      color: "#0D062D",
                      fontFamily: "Inter",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "normal",
                      mt: "6px",
                    }}
                  >
                    {task.name}
                  </Typography>
                  <Typography
                    component="h6"
                    sx={{
                      color: "#787486",
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "normal",
                      mt: "8px",
                    }}
                  >
                    {task.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "28px",
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <BackgroundLetterAvatars
                        firstName={task.author.firstName}
                        secondName={task.author.secondName}
                      />
                      <BackgroundLetterAvatars
                        firstName={task.executor.firstName}
                        secondName={task.executor.secondName}
                      />
                    </Stack>
                  </Box>
                </DraggableTaskWrapper>
              ))}

              <DragOverlay>
                {activeTask != null && (
                  <div key={activeTask.name}>
                    <p>{activeTask.name}</p>
                  </div>
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        )}
      </Box>
    </DraggableColumnWrapper>
  );
};
