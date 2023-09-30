import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import api from "../../../utils/axios";
import { CustomSelect, ModalWindow } from "../../index";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { PRIORITY_ENUM } from "../../../entities";
import {
  MOCK_EXECUTOR,
  PRIORITIES_TASK,
} from "../../../pages/ManagerPage/modals/constants";

interface IProps {
  show: boolean;
  onClose: () => void;
}

export const CreateTaskModal = ({ show, onClose }: IProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    dayjs().add(14, "day"),
  );
  const [priority, setPriority] = useState(PRIORITY_ENUM.MEDIUM);
  const [executor, setExecutor] = useState("");
  const [estimate, setEstimate] = useState(0);

  const handleSubmit = () => {
    api()
      .post("/task", {
        title,
        description,
        deadline,
        priority,
        executor,
        estimate,
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={onClose}
      title="Создание задачи"
      maxWidth="sm"
      onSubmit={handleSubmit}
      disabledSubmitButton={
        title.length === 0 || !priority || !executor || estimate <= 0
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
        <TextField
          required
          fullWidth
          maxRows={1}
          label="Имя"
          size="medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          label="Описание"
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box display="flex" width="100%" columnGap="16px">
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
            value={priority}
            labelId="priority-label"
            label="Приоритет"
            onSelect={(value) => setPriority(value as PRIORITY_ENUM)}
            items={PRIORITIES_TASK}
          />
        </Box>

        <CustomSelect
          fullWidth
          required
          value={executor}
          labelId="executor-label"
          label="Исполнитель"
          onSelect={setExecutor}
          items={MOCK_EXECUTOR}
        />

        <TextField
          fullWidth
          label="Оценка"
          type="number"
          value={estimate}
          inputProps={{ inputMode: "numeric" }}
          onChange={(e) => setEstimate(+(e.target.value ?? 0))}
        />
      </Box>
    </ModalWindow>
  );
};
