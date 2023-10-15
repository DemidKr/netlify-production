import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import { AxiosResponse } from "axios";
import { v4 as v4uuid } from "uuid";
import { Box, Typography } from "@mui/material";

import { Columns } from "../../components/Columns";
import { PRIORITY_ENUM, ColumnType, TaskType, ISprint } from "../../entities";
import { MainWrapper, MoreInfoModal } from "../../components";
import api from "../../utils/axios";
import { VISIBLE_DATE_FORMAT } from "../../constants";

const EMPTY_TASK = {
  name: "",
  description: "",
  status: PRIORITY_ENUM.LOW,
  author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
  executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
  hidden: true,
};

export const UserTasks = () => {
  const requested = useRef(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState<TaskType | null>(
    null,
  );
  const [currentSprint, setCurrentSprint] = useState<ISprint | null>(null);
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
      showMenu: false,
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
      showMenu: false,
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
      name: "Тестируется",
      tasks: [
        {
          ...EMPTY_TASK,
          id: v4uuid(),
        },
      ],
      color: "#1AAAAA",
      showMenu: false,
    },
    {
      id: "6",
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
                      ...body?.data.filter(
                        (task) => task.status_id === 1 || task.status_id === 2,
                      ),
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

                    newColumns[5].tasks = [
                      {
                        ...EMPTY_TASK,
                        id: v4uuid(),
                      },
                      ...body?.data.filter((task) => task.status_id === 6),
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
    <MainWrapper>
      <Box mt="28px">
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
              ? `Спринт ${currentSprint?.id}(${currentSprint?.name}) - до ${dayjs(
                  currentSprint?.deadline_at,
                )?.format(VISIBLE_DATE_FORMAT)}`
              : null}
          </Typography>
        </Box>

        <Columns
          columns={columns}
          setColumns={setColumns}
          setShowMoreInfoModal={setShowMoreInfoModal}
        />
      </Box>

      <MoreInfoModal
        show={!!showMoreInfoModal}
        onClose={() => setShowMoreInfoModal(null)}
        task={showMoreInfoModal}
      />
    </MainWrapper>
  );
};
