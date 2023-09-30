import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import { TaskType } from "../../entities";
import { DraggableColumnWrapper } from "./components/DraggableColumnWrapper";
import { DraggableTaskWrapper } from "./components/DraggableTaskWrapper";
import { Card } from "./components/Card";
import { AddButton } from "./components/AddButton";

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
  const deleteTaskHandler = (deleteIndex: number) => {
    const deletedTaskArray = currentColumn.tasks.filter(
      (_column, index) => index !== deleteIndex,
    );
    const copyColumnsArray = JSON.parse(JSON.stringify(columns));
    copyColumnsArray[currentColumnIndex].tasks = deletedTaskArray;
    setColumns(copyColumnsArray);
  };

  return (
    <DraggableColumnWrapper>
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
              {currentColumn.tasks.length - 1}
            </Box>
          </Box>
          {currentColumn.name === "Backlog" && (
            <AddButton setShowAddTaskButton={() => {}} />
          )}
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
          maxHeight: "calc(100vh - 204px)",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {currentColumn.tasks.length > 0 && (
          <SortableContext
            items={currentColumn.tasks}
            strategy={rectSortingStrategy}
          >
            {currentColumn.tasks.map((task, index) => {
              if (task.hidden) {
                return (
                  <DraggableTaskWrapper
                    key={task.id}
                    id={task.id}
                    hidden={task.hidden}
                  >
                    <Box height="20px" />
                  </DraggableTaskWrapper>
                );
              }

              return (
                <DraggableTaskWrapper key={task.id} id={task.id}>
                  <Card
                    task={task}
                    deleteCard={() => deleteTaskHandler(index)}
                  />
                </DraggableTaskWrapper>
              );
            })}
          </SortableContext>
        )}
      </Box>
    </DraggableColumnWrapper>
  );
};
