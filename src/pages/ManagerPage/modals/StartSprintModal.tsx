import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import api from "../../../utils/axios";
import { CustomSelect, ModalWindow } from "../../../components/index";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { ISelectItem } from "../../../entities";

interface IProps {
  show: boolean;
  onClose: () => void;
  targetTasks: ISelectItem[];
}

export const StartSprintModal = ({ show, onClose, targetTasks }: IProps) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    dayjs().add(14, "day"),
  );
  const [showWarning, setShowWarning] = useState(true);
  const [targetTask, setTargetTask] = useState("");

  const handleClose = () => {
    onClose();
    setName("");
    setDeadline(dayjs().add(14, "day"));
    setTargetTask("");
    setShowWarning(true);
  };

  const handleSubmit = () => {
    const daysUntilDeadline = dayjs(deadline).diff(dayjs(), "days") + 1;

    api()
      .post("/sprint", {
        name,
        target_task_ids: [targetTask],
        deadline_at: dayjs(deadline).format(BASIC_DATE_FORMAT),
        days_until_deadline: daysUntilDeadline,
        estimate: 400,
      })
      .then(() => {
        handleClose();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  };

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={handleClose}
      title="Закрытие спринта"
      maxWidth="sm"
      onSubmit={handleSubmit}
      disabledSubmitButton={
        name?.length === 0 || !!!deadline || targetTask?.length === 0
      }
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
        {showWarning ? (
          <>
            <Typography color="green">
              Внимание! Все не закрытые задачи в прошлом спринте будут
              автоматически перенесены в следующий спринт. Если хотите закрыть
              какие-то задачи - выйдите, закройте задачи и зайдите обратно.
            </Typography>

            <Button
              onClick={() => setShowWarning(false)}
              variant="contained"
              color="primary"
              type="submit"
            >
              Ознакомился
            </Button>
          </>
        ) : (
          <Box display="flex" flexDirection="column" gap="16px">
            <TextField
              required
              fullWidth
              maxRows={1}
              label="Название нового спринта"
              size="medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <DatePicker
              sx={{ width: "100%" }}
              label="Срок"
              format={BASIC_DATE_FORMAT}
              value={deadline}
              onChange={setDeadline}
            />

            <CustomSelect
              required
              fullWidth
              value={targetTask}
              labelId="priority-label"
              label="Целевая задача"
              onSelect={setTargetTask}
              items={targetTasks}
            />
          </Box>
        )}
      </Box>
    </ModalWindow>
  );
};
