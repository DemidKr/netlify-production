import { useEffect, useState, memo } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CustomSelect, ModalWindow } from "../../../components";
import { BASIC_DATE_FORMAT } from "../../../constants";
import {
  ISelectItem,
  PRIORITIES_TASK,
  PRIORITY_ENUM,
  TaskType,
} from "../../../entities";
import { getPriorityById, getPriorityIdByName } from "../../../utils/helpers";
import { AxiosResponse } from "axios/index";
import { IUser } from "../../../entities/user";
import api from "../../../utils/axios";

interface IProps {
  show: boolean;
  onClose: () => void;
  task: TaskType;
}

export const UpdateTaskModal = memo(({ show, onClose, task }: IProps) => {
  const [name, setName] = useState(task.name ?? "");
  const [description, setDescription] = useState(task.description ?? "");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    task.deadline ? dayjs(task.deadline) : dayjs().add(14, "day"),
  );
  const [priority, setPriority] = useState(
    getPriorityById(task?.priority_id ?? 0),
  );
  const [executors, setExecutors] = useState<ISelectItem[]>([]);
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
        priority_id: getPriorityIdByName(priority),
      })
      .then(() => {
        onClose();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  };

  useEffect(() => {
    if (show && executors?.length === 0) {
      // получаем участников команды
      api()
        .get("/team/developers")
        .then((body: AxiosResponse<IUser[]>) => {
          if (body?.data) {
            setExecutors(
              body.data.map((executor) => ({
                code: executor.id,
                name: executor.first_name ?? "",
              })),
            );
          }
        });

      setName(task.name ?? "");
      setDescription(task.description ?? "");
      setDeadline(
        task.deadline_at ? dayjs(task.deadline_at) : dayjs().add(14, "day"),
      );
      setPriority(getPriorityById(task?.priority_id ?? 1));
      setExecutor(task.executor_id ?? "");
      setEstimate(task.estimate ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <ModalWindow
      withCancelButton
      open={show}
      onClose={onClose}
      title="Редактирование задачи"
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
          items={executors}
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
});
