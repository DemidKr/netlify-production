import { useState } from "react";

import { Columns } from "../../components/Columns";
import type { ColumnType } from "../../components/Column";
import { Box } from "@mui/material";

export const UserTasks = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "1234",
      name: "All tasks",
      tasks: [
        { name: "1234", id: "123" },
        { name: "2225", id: "1234" },
      ],
      color: "#8BC48A",
    },
    {
      id: "123321",
      name: "To Do",
      tasks: [
        { name: "123", id: "1" },
        { name: "222", id: "12" },
      ],
      color: "#5030E5",
    },
    {
      id: "123",
      name: "On Progress",
      tasks: [
        { name: "1234", id: "123" },
        { name: "2225", id: "1234" },
      ],
      color: "#FFA500",
    },
    {
      id: "12345",
      name: "QA",
      tasks: [
        { name: "1234", id: "123" },
        { name: "2225", id: "1234" },
      ],
      color: "#8BC48A",
    },
    {
      id: "123456",
      name: "Done",
      tasks: [
        { name: "1234", id: "123" },
        { name: "2225", id: "1234" },
      ],
      color: "#8BC48A",
    },
  ]);

  return (
    <>
      <Box>
        <Columns columns={columns} setColumns={setColumns} />
      </Box>
    </>
  );
};
