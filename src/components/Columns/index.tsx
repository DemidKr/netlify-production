import { Box, useMediaQuery } from "@mui/material";
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
import { arrayMove } from "@dnd-kit/sortable";

import { ColumnType, TaskType } from "../../entities";
import api from "../../utils/axios";
import { ROLE_ID_ENUM } from "../../entities/user";
import { Card } from "./components/Column/components/Card";
import { Column } from "./components/Column";

type ColumnsProps = {
  columns: ColumnType[];
  currentSprint?: string;
  setColumns: (columns: ColumnType[]) => void;
  setShowCreateTaskModal?: () => void;
  setShowUpdateTaskModal?: () => void;
  setUpdateTaskItem?: (task: TaskType) => void;
  setShowMoreInfoModal?: (task: TaskType) => void;
};

export const Columns = ({
  columns,
  currentSprint,
  setColumns,
  setShowCreateTaskModal,
  setShowUpdateTaskModal,
  setUpdateTaskItem,
  setShowMoreInfoModal,
}: ColumnsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");

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
      const activeTask = columns[activeColumnIndex]?.tasks?.find(
        (task) => task.id === active.id,
      );

      // нельзя перенести обратно задачу в бэклог всем кроме менеджера
      if (
        copyColumnsArray[newColumnIndex].id === 1 &&
        currentUser.role_id !== ROLE_ID_ENUM.MANAGER
      ) {
        return;
      }

      // если текущая колонка готово, то уже никуда нельзя перенести(кроме менеджера)
      if (
        copyColumnsArray[activeColumnIndex].id === 6 &&
        currentUser.role_id !== ROLE_ID_ENUM.MANAGER
      ) {
        return;
      }

      // пользователь может переносить во все колонки кроме "готово" и "тестируется"
      if (
        currentUser.role_id === ROLE_ID_ENUM.USER &&
        (copyColumnsArray[newColumnIndex].id === 6 ||
          copyColumnsArray[newColumnIndex].id === 5)
      ) {
        return;
      }

      // тестировщик может перенести в "готово" или "в работу" для исправления
      if (
        currentUser.role_id === ROLE_ID_ENUM.TESTER &&
        (copyColumnsArray[newColumnIndex].id === 1 ||
          copyColumnsArray[newColumnIndex].id === 3)
      ) {
        return;
      }

      if (activeTask) {
        if (activeTask.hidden) {
          copyColumnsArray[newColumnIndex].tasks.push(activeTask);
        } else {
          // удаляем старый
          copyColumnsArray[activeColumnIndex].tasks = copyColumnsArray[
            activeColumnIndex
          ].tasks.filter((task: TaskType) => task.id !== activeTask.id);
          // меняем спринт
          activeTask.sprint_id = currentSprint;
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

          // eslint-disable-next-line
          api().put(`/task/${activeTask.id}`, {
            status_id: newColumnIndex + 1,
            sprint_id: currentSprint,
          });
        }
      }

      setColumns(copyColumnsArray);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isDesktop ? "initial" : "row",
        flexWrap: isDesktop ? "initial" : "wrap",
        gap: "20px",
        alignItems: "flex-start",
        padding: "40px",
        overflowX: "auto",
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
            setShowCreateTaskModal={setShowCreateTaskModal}
            setShowUpdateTaskModal={setShowUpdateTaskModal}
            setUpdateTaskItem={setUpdateTaskItem}
            setShowMoreInfoModal={setShowMoreInfoModal}
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
