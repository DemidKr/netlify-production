import Box from "@mui/material/Box";
import { Status } from "./Status";
import { CardMenu } from "./CardMenu";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { BackgroundLetterAvatars } from "../../BackgroundLetterAvatars";
import { TaskType } from "../../../entities";

interface IProps {
  task: TaskType;
  deleteCard: () => void;
}

export const Card = ({ task, deleteCard }: IProps) => {
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
        <CardMenu deleteCard={deleteCard} />
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
            firstName={task.author.firstName}
            secondName={task.author.secondName}
          />
          <BackgroundLetterAvatars
            firstName={task.executor.firstName}
            secondName={task.executor.secondName}
          />
        </Stack>
      </Box>
    </>
  );
};
