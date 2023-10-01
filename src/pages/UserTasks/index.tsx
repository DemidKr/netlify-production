import { useState } from "react";
import { v4 as v4uuid } from "uuid";

import { Columns } from "../../components/Columns";
import { Box } from "@mui/material";
import { PRIORITY_ENUM, ColumnType } from "../../entities";
import { MainWrapper } from "../../components";

export const UserTasks = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "1",
      name: "Backlog",
      tasks: [
        {
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: v4uuid(),
          hidden: true,
        },
        {
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: "12",
        },
        {
          name: "2225",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: "12", first_name: "Dmitry", second_name: "Pupkin" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: "13",
        },
      ],
      color: "#1E293B",
    },
    {
      id: "2",
      name: "To Do",
      tasks: [
        {
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: v4uuid(),
          hidden: true,
        },
        {
          name: "Onboarding Illustrations ",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HIGH,
          author: { id: "12", first_name: "Remy", second_name: "Sharp" },
          executor: {
            id: "23",
            first_name: "Travis",
            second_name: "Howard",
          },
          id: "14",
        },
        {
          name: "222",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: "12", first_name: "Cindy", second_name: "Baker" },
          executor: {
            id: "23",
            first_name: "Travis",
            second_name: "Howard",
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
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: v4uuid(),
          hidden: true,
        },
        {
          name: "Brainstorming",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Dmitry", second_name: "Olegov" },
          executor: {
            id: "23",
            first_name: "Travis",
            second_name: "Howard",
          },
          id: "16",
        },
        {
          name: "Mobile App Design",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HOT,
          author: { id: "12", first_name: "Dmitry", second_name: "Olegov" },
          executor: { id: "12", first_name: "Cindy", second_name: "Baker" },
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
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: v4uuid(),
          hidden: true,
        },
        {
          name: "1234",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HIGH,
          author: { id: "12", first_name: "Dmitry", second_name: "Olegov" },
          executor: { id: "12", first_name: "Cindy", second_name: "Baker" },
          id: "18",
        },
        {
          name: "2225",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.MEDIUM,
          author: { id: "12", first_name: "Cindy", second_name: "Baker" },
          executor: { id: "12", first_name: "Remy", second_name: "Sharp" },
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
          name: "1234",
          description:
            "Brainstorming brings team members' diverse experience into play.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Oleg", second_name: "Petrov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: v4uuid(),
          hidden: true,
        },
        {
          name: "1234",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.LOW,
          author: { id: "12", first_name: "Dmitry", second_name: "Olegov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: "20",
        },
        {
          name: "Design System",
          description:
            "Low fidelity wireframes include the most basic content and visuals.",
          status: PRIORITY_ENUM.HOT,
          author: { id: "12", first_name: "Dmitry", second_name: "Olegov" },
          executor: { id: "23", first_name: "Ryan", second_name: "Gosling" },
          id: "21",
        },
      ],
      color: "#8BC48A",
    },
  ]);

  return (
    <MainWrapper>
      <Box>
        <Columns columns={columns} setColumns={setColumns} />
      </Box>
    </MainWrapper>
  );
};
