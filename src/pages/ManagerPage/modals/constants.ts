import { PRIORITY_ENUM } from "../../../entities";

export const PRIORITIES_TASK = [
  { name: "Очень высокий", code: PRIORITY_ENUM.HOT },
  { name: "Высокий", code: PRIORITY_ENUM.HIGH },
  { name: "Средний", code: PRIORITY_ENUM.MIDDLE },
  { name: "Низкий", code: PRIORITY_ENUM.LOW },
];

export const MOCK_EXECUTOR = [
  { name: "Иван Иванович", code: "123" },
  { name: "Петр Петрович", code: "51234" },
  { name: "Никита Сергеевич", code: "9123333" },
  { name: "Алексей Михайлович", code: "5444" },
];
