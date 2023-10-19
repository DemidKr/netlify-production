import { TaskType } from "./task";

export interface ISelectItem {
  code: string;
  name: string;
}

export type ColumnType = {
  id: number;
  name: string;
  tasks: TaskType[];
  color: string;
  showMenu: boolean;
};
