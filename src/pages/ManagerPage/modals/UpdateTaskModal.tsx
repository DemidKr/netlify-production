import { useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import api from "../../../utils/axios";
import { CustomSelect, ModalWindow } from "../../../components";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { PRIORITIES_TASK, PRIORITY_ENUM, TaskType } from "../../../entities";
import { getPriorityById } from "../../../utils/helpers";

const MOCK_EXECUTOR = [
  { name: "Иван Иванович", code: "123" },
  { name: "Петр Петрович", code: "51234" },
  { name: "Никита Сергеевич", code: "9123333" },
  { name: "Алексей Михайлович", code: "5444" },
];

interface IProps {
  show: boolean;
  onClose: () => void;
  task: TaskType;
}

export const UpdateTaskModal = ({ show, onClose, task }: IProps) => {
  const [name, setName] = useState(task.name ?? "");
  const [description, setDescription] = useState(task.description ?? "");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    task.deadline ? dayjs(task.deadline) : dayjs().add(14, "day"),
  );
  const [priority, setPriority] = useState(
    getPriorityById(task?.priority_id ?? 0),
  );
  const [executor, setExecutor] = useState(task.executor_id ?? "");
  const [estimate, setEstimate] = useState(task.estimate ?? 0);

  const handleSubmit = () => {
    const daysUntilDeadline = dayjs(deadline).diff(dayjs(), "days") + 1;

    api()
      .put(`/task/${task.id}`, {
        name,
        description,
        deadline_at: dayjs(deadline).format(BASIC_DATE_FORMAT),
        executor_id: executor,
        estimate,
        days_until_deadline: daysUntilDeadline,
        priority_id: +priority,
      })
      .then(() => {
        onClose();
      });
  };

  useEffect(() => {
    setName(task.name ?? "");
    setDescription(task.description ?? "");
    setDeadline(task.deadline ? dayjs(task.deadline) : dayjs().add(14, "day"));
    setPriority(getPriorityById(task?.priority_id ?? 1));
    setExecutor(task.executor_id ?? "");
    setEstimate(task.estimate ?? 0);
  }, [task]);

  console.log("name", name, "descrip", description);

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={onClose}
      title="Создание задачи"
      maxWidth="sm"
      onSubmit={handleSubmit}
      disabledSubmitButton={name.length === 0 || !priority || !executor}
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          label="Оценка, часов"
          type="number"
          value={estimate}
          inputProps={{ inputMode: "numeric" }}
          onChange={(e) => setEstimate(+(e.target.value ?? 0))}
        />
      </Box>
    </ModalWindow>
  );
};
