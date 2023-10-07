import { PRIORITY_ENUM } from "../entities";

export const getPriorityById = (id: number) => {
  switch (id) {
    case 1:
      return PRIORITY_ENUM.LOW;
    case 3:
      return PRIORITY_ENUM.HIGH;
    case 4:
      return PRIORITY_ENUM.HOT;
    default:
    case 2:
      return PRIORITY_ENUM.MEDIUM;
  }
};
