import { useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import api from "../../../utils/axios";
import { CustomSelect, ModalWindow } from "../../../components/index";
import { BASIC_DATE_FORMAT } from "../../../constants";
import { IProperty, ISelectItem } from "../../../entities";
import { IUser } from "../../../entities/user";
import { AxiosResponse } from "axios";

interface IProps {
  show: boolean;
  onClose: () => void;
}

export const CreateTaskModal = ({ show, onClose }: IProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Dayjs | null>(
    dayjs().add(14, "day"),
  );
  const [priority, setPriority] = useState("3");
  const [executor, setExecutor] = useState("");
  const [estimate, setEstimate] = useState(0);
  const [executors, setExecutors] = useState<ISelectItem[]>([]);
  const [priorities, setPriorities] = useState<ISelectItem[]>([]);

  const handleSubmit = () => {
    const daysUntilDeadline = dayjs(deadline).diff(dayjs(), "days") + 1;

    api()
      .post("/task", {
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
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      });
  };

  useEffect(() => {
    if (show) {
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

      // получает enum приоритетов
      api()
        .get("/priorities")
        .then((body: AxiosResponse<IProperty[]>) => {
          if (body?.data) {
            setPriorities(
              body.data.map((priority) => ({
                code: priority.id,
                name: priority.label,
              })),
            );
          }
        });
    }

    return () => {
      setExecutors([]);
      setPriorities([]);
    };
  }, [show]);

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
            onSelect={setPriority}
            items={priorities}
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
};
