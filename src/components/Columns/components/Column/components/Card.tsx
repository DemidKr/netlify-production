import Box from "@mui/material/Box";
import { Status } from "./Status";
import { CardMenu } from "./CardMenu";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import { BackgroundLetterAvatars } from "../../../../BackgroundLetterAvatars";
import { TaskType } from "../../../../../entities";

interface IProps {
  task: TaskType;
  deleteCard: () => void;
  setShowUpdateTaskModal?: () => void;
  setUpdateTaskItem?: (task: TaskType) => void;
  showMenu?: boolean;
}

export const Card = ({
  task,
  deleteCard,
  setShowUpdateTaskModal,
  setUpdateTaskItem,
  showMenu = false,
}: IProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Status status={task.status} />
        {showMenu && (
          <CardMenu
            deleteCard={deleteCard}
            onUpdateTask={() => {
              setShowUpdateTaskModal?.();
              setUpdateTaskItem?.(task);
            }}
          />
        )}
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
            firstName={task.author.first_name ?? ""}
            secondName={task.author.second_name ?? ""}
          />
          <BackgroundLetterAvatars
            firstName={task.executor.first_name ?? ""}
            secondName={task.executor.second_name ?? ""}
          />
        </Stack>
      </Box>
    </>
  );
};
