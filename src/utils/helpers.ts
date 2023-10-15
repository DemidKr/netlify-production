import { PRIORITY_ENUM } from "../entities";
import { ROLE_ENUM } from "../entities/user";

export const getPriorityById = (id: number) => {
  switch (id) {
    case 1:
      return PRIORITY_ENUM.HOT;
    case 2:
      return PRIORITY_ENUM.HIGH;
    case 4:
      return PRIORITY_ENUM.LOW;
    default:
    case 3:
      return PRIORITY_ENUM.MEDIUM;
  }
};

export const getPriorityIdByName = (priorityName: string) => {
  switch (priorityName) {
    case PRIORITY_ENUM.HOT:
      return 1;
    case PRIORITY_ENUM.HIGH:
      return 2;
    case PRIORITY_ENUM.LOW:
      return 4;
    default:
    case PRIORITY_ENUM.MEDIUM:
      return 4;
  }
};

export const getUserRoleNameById = (id: number) => {
  switch (id) {
    case 2:
      return ROLE_ENUM.TESTER;
    case 3:
      return ROLE_ENUM.MANAGER;
    default:
    case 1:
      return ROLE_ENUM.USER;
  }
};
