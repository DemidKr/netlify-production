import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CustomSelect, ModalWindow } from "../../../components";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { PRIORITY_ENUM } from "../../../entities";
import { PRIORITIES_TASK } from "./constants";

interface IProps {
  show: boolean;
  onClose: () => void;
}

export const CreateTaskModal = ({ show, onClose }: IProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    dayjs().add(14, "day")
  );
  const [priority, setPriority] = useState<PRIORITY_ENUM>(PRIORITY_ENUM.MIDDLE);

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={onClose}
      title="Создание задачи"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "16px",
          py: "16px",
        }}
      >
        <TextField
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

        <DatePicker
          sx={{ width: "100%" }}
          label="Срок"
          format={BASIC_DATE_FORMAT}
          value={deadline}
          onChange={setDeadline}
        />

        <CustomSelect
          fullWidth
          value={priority}
          labelId="priority-label"
          label="Приоритет"
          onSelect={(value) => setPriority(value as PRIORITY_ENUM)}
        >
          {PRIORITIES_TASK.map((priority) => (
            <MenuItem value={priority.code}>{priority.name}</MenuItem>
          ))}
        </CustomSelect>
      </Box>
    </ModalWindow>
  );
};
