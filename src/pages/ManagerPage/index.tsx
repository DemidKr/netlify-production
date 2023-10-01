import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as v4uuid } from "uuid";
import { Box, Button } from "@mui/material";
import { AxiosResponse } from "axios";

import { Columns, MainWrapper } from "../../components";
import { DeleteTaskModal, StartSprintModal, UpdateTaskModal } from "./modals";
import { PRIORITY_ENUM, TaskType, ColumnType, ISprint } from "../../entities";
import { CreateTaskModal } from "./modals/CreateTaskModal";
import api from "../../utils/axios";

const EMPTY_TASK = {
  name: "",
  description: "",
  status: PRIORITY_ENUM.LOW,
  author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
  executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
  hidden: true,
};

export const ManagerPage = () => {
  const requested = useRef(false);
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "1",
      name: "Backlog",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#1E293B",
    },
    {
      id: "2",
      name: "To Do",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#5030E5",
    },
    {
      id: "3",
      name: "In Progress",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#FFA500",
    },
    {
      id: "4",
      name: "QA",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#33BFFF",
    },
    {
      id: "5",
      name: "Done",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#8BC48A",
    },
  ]);

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showStartSprintModal, setShowStartSprintModal] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [updateTaskItem, setUpdateTaskItem] = useState<TaskType | null>(null);

  const targetTasks = useMemo(
    () =>
      columns[0]?.tasks?.length > 0
        ? columns[0]?.tasks?.map((task) => ({
            code: task.id,
            name: task.name,
          }))
        : [],
    [columns],
  );

  useEffect(() => {
    if (!requested.current) {
      api()
        .get("/sprint/all")
        .then((body: AxiosResponse<ISprint[]>) => {
          if (body?.data?.length > 0) {
            //получили текущий спринт
            api()
              .get(`/sprint/${body?.data?.[0]?.id}/tasks`)
              .then((body: AxiosResponse<TaskType[]>) => {
                if (body?.data) {
                  //получили задачи текущего спринта
                  //сетим для туду столбца все новые задачи
                  setColumns((prevColumns) => {
                    const newColumns = JSON.parse(JSON.stringify(prevColumns));
                    newColumns[1].tasks = [
                      {
                        ...EMPTY_TASK,
                        id: v4uuid(),
                      },
                      ...body?.data,
                    ];

                    return newColumns;
                  });
                }
              });
          }
        });
      api()
        .get("/task/all")
        .then((body: AxiosResponse<TaskType[]>) => {
          if (body?.data) {
            setColumns((prevColumns) => {
              const newColumns = JSON.parse(JSON.stringify(prevColumns));
              newColumns[0].tasks = [
                {
                  ...EMPTY_TASK,
                  id: v4uuid(),
                },
                ...body?.data,
              ];

              return newColumns;
            });
          }
        });

      requested.current = true;
    }
  }, []);

  return (
    <MainWrapper isManagerMode>
      <Box display="flex" flexDirection="column" p="12px">
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setShowStartSprintModal(true)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Закончить спринт
          </Button>
        </Box>

        <Columns
          columns={columns}
          setColumns={setColumns}
          setShowCreateTaskModal={() => setShowCreateTaskModal(true)}
          setShowUpdateTaskModal={() => setShowCreateTaskModal(true)}
          setUpdateTaskItem={setUpdateTaskItem}
        />
      </Box>

      <DeleteTaskModal
        show={showDeleteTaskModal}
        onClose={() => setShowDeleteTaskModal(false)}
        taskId="123"
      />

      <CreateTaskModal
        show={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
      />

      <StartSprintModal
        show={showStartSprintModal}
        onClose={() => setShowStartSprintModal(false)}
        targetTasks={targetTasks}
      />

      {updateTaskItem && (
        <UpdateTaskModal
          show={showUpdateTask}
          onClose={() => setShowUpdateTask(false)}
          task={updateTaskItem}
        />
      )}
    </MainWrapper>
  );
};
