import { useEffect, useRef, useState } from "react";
import { v4 as v4uuid } from "uuid";
import { Box, Button } from "@mui/material";
import { AxiosResponse } from "axios";

import { Columns, MainWrapper } from "../../components";
import { DeleteTaskModal, StartSprintModal } from "./modals";
import { PRIORITY_ENUM, TaskType, ColumnType } from "../../entities";
import { CreateTaskModal } from "./modals/CreateTaskModal";
import api from "../../utils/axios";

const EMPTY_TASK = {
  name: "",
  description: "",
  status: PRIORITY_ENUM.LOW,
  author: { id: "12", firstName: "Oleg", secondName: "Petrov" },
  executor: { id: "23", firstName: "Ryan", secondName: "Gosling" },
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
        {
          name: "Onboarding Illustrations ",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HIGH,
          author: { id: "12", firstName: "Remy", secondName: "Sharp" },
          executor: {
            id: "23",
            firstName: "Travis",
            secondName: "Howard",
          },
          id: "14",
        },
        {
          name: "222",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: "12", firstName: "Cindy", secondName: "Baker" },
          executor: {
            id: "23",
            firstName: "Travis",
            secondName: "Howard",
          },
          id: "11231235",
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
        {
          name: "Brainstorming",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", firstName: "Dmitry", secondName: "Olegov" },
          executor: {
            id: "23",
            firstName: "Travis",
            secondName: "Howard",
          },
          id: "16",
        },
        {
          name: "Mobile App Design",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HOT,
          author: { id: "12", firstName: "Dmitry", secondName: "Olegov" },
          executor: { id: "12", firstName: "Cindy", secondName: "Baker" },
          id: "17",
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
        {
          name: "1234",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HIGH,
          author: { id: "12", firstName: "Dmitry", secondName: "Olegov" },
          executor: { id: "12", firstName: "Cindy", secondName: "Baker" },
          id: "18",
        },
        {
          name: "2225",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: "12", firstName: "Cindy", secondName: "Baker" },
          executor: { id: "12", firstName: "Remy", secondName: "Sharp" },
          id: "19",
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
        {
          name: "1234",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", firstName: "Dmitry", secondName: "Olegov" },
          executor: { id: "23", firstName: "Ryan", secondName: "Gosling" },
          id: "20",
        },
        {
          name: "Design System",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HOT,
          author: { id: "12", firstName: "Dmitry", secondName: "Olegov" },
          executor: { id: "23", firstName: "Ryan", secondName: "Gosling" },
          id: "21",
        },
      ],
      color: "#8BC48A",
    },
  ]);

  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showStartSprintModal, setShowStartSprintModal] = useState(false);

  useEffect(() => {
    // api()
    //   .get('/sprint/1/tasks')
    //   .then((body: AxiosResponse<TaskType[]>) => {
    //     if (body?.data) {
    //       console.log('body?.data', body?.data);
    //     }
    //   });
    if (!requested.current) {
      api()
        .get("/task/all")
        .then((body: AxiosResponse<TaskType[]>) => {
          if (body?.data) {
            // setColumns(prevColumns => {
            //   prevColumns[0].tasks = [
            //     {
            //       ...EMPTY_TASK,
            //       id: v4uuid(),
            //     },
            //     ...body?.data,
            //   ];
            //   console.log('prevColumns', prevColumns);
            //   return prevColumns;
            // });
          }
        });

      requested.current = true;
    }
  }, []);

  return (
    <MainWrapper>
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
      />
    </MainWrapper>
  );
};
