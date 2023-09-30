import { IUser } from "./user";

export enum PRIORITY_ENUM {
  HOT = "hot",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export interface TaskType {
  id: string;
  name: string;
  description: string;
  status: PRIORITY_ENUM;
  author: IUser;
  executor: IUser;
}
