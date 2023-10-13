import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 as v4uuid } from "uuid";
import { Box, Button, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";

import { Columns, MainWrapper } from "../../components";
import { VISIBLE_DATE_FORMAT } from "../../constants";
import { DeleteTaskModal, StartSprintModal, UpdateTaskModal } from "./modals";
import { ColumnType, ISprint, PRIORITY_ENUM, TaskType } from "../../entities";
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
      name: "Хранилище",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#1E293B",
      showMenu: true,
    },
    {
      id: "2",
      name: "В работу",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#5030E5",
      showMenu: true,
    },
    {
      id: "3",
      name: "В работе",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#FFA500",
      showMenu: false,
    },
    {
      id: "4",
      name: "Тестирование",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#33BFFF",
      showMenu: false,
    },
    {
      id: "5",
      name: "Готово",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#8BC48A",
      showMenu: false,
    },
  ]);

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showStartSprintModal, setShowStartSprintModal] = useState(false);
  const [showUpdateTask, setShowUpdateTask] = useState(false);
  const [updateTaskItem, setUpdateTaskItem] = useState<TaskType | null>(null);
  const [currentSprint, setCurrentSprint] = useState<ISprint | null>(null);

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

  const handleCloseUpdateTaskModal = useCallback(() => {
    setShowUpdateTask(false);
  }, []);

  useEffect(() => {
    if (!requested.current) {
      api()
        .get("/sprint/all")
        .then((body: AxiosResponse<ISprint[]>) => {
          if (body?.data?.length > 0) {
            //получили текущий спринт
            setCurrentSprint(body?.data?.[0]);

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
                      ...body?.data.filter((task) => task.status_id === 2),
                    ];

                    newColumns[2].tasks = [
                      {
                        ...EMPTY_TASK,
                        id: v4uuid(),
                      },
                      ...body?.data.filter((task) => task.status_id === 3),
                    ];

                    newColumns[3].tasks = [
                      {
                        ...EMPTY_TASK,
                        id: v4uuid(),
                      },
                      ...body?.data.filter((task) => task.status_id === 4),
                    ];

                    newColumns[4].tasks = [
                      {
                        ...EMPTY_TASK,
                        id: v4uuid(),
                      },
                      ...body?.data.filter((task) => task.status_id === 5),
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
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          px="40px"
        >
          <Typography
            component="h3"
            sx={{
              color: "#0D062D",
              fontFamily: "Inter",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
            }}
          >
            {currentSprint
              ? `Спринт ${currentSprint?.id} - до ${dayjs(
                  currentSprint?.deadline_at,
                )?.format(VISIBLE_DATE_FORMAT)}`
              : null}
          </Typography>

          <Box display="flex">
            <Button
              onClick={() => setShowStartSprintModal(true)}
              variant="contained"
              color="primary"
              type="submit"
            >
              Закончить спринт
            </Button>
          </Box>
        </Box>

        <Columns
          columns={columns}
          setColumns={setColumns}
          setShowCreateTaskModal={() => setShowCreateTaskModal(true)}
          setShowUpdateTaskModal={() => setShowUpdateTask(true)}
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
          onClose={handleCloseUpdateTaskModal}
          task={updateTaskItem}
        />
      )}
    </MainWrapper>
  );
};
