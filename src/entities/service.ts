import { TaskType } from "./task";

export interface ISelectItem {
  code: string;
  name: string;
}

export type ColumnType = {
  id: string;
  name: string;
  tasks: TaskType[];
  color: string;
  showMenu: boolean;
};
