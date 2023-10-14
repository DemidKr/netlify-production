import Box from "@mui/material/Box";

import { ModalWindow } from ".";
import { TaskType } from "../entities";
import { Typography } from "@mui/material";
import { Status } from "./Columns/components/Column/components/Status";
import { getPriorityById } from "../utils/helpers";

interface IProps {
  show: boolean;
  onClose: () => void;
  task: TaskType | null;
}

export const MoreInfoModal = ({ show, onClose, task }: IProps) => {
  if (!task) {
    return null;
  }

  return (
    <ModalWindow
      withoutSubmit
      open={show}
      onClose={onClose}
      title={task.name}
      maxWidth="sm"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          py: "16px",
        }}
      >
        <Box width="max-content">
          <Status status={getPriorityById(task?.priority_id ?? 1)} />
        </Box>

        <Typography variant="h3">
          Исполнитель - {task.author.second_name} {task.author.first_name}{" "}
          {task.author.middle_name}
        </Typography>

        <Typography variant="h5">{task.description}</Typography>
      </Box>
    </ModalWindow>
  );
};
