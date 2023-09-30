import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import api from "../../../utils/axios";
import { CustomSelect, ModalWindow } from "../../../components";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { PRIORITY_ENUM } from "../../../entities";
import { MOCK_EXECUTOR, PRIORITIES_TASK } from "./constants";

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

  const handleSubmit = () => {
    api()
      .post("/task", {
        title,
        description,
        deadline,
        priority,
        executor,
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
      maxWidth="md"
      onSubmit={handleSubmit}
      disabledSubmitButton={title.length === 0 || !priority || !executor}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          label="Описание"
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
      </Box>
    </ModalWindow>
  );
};
