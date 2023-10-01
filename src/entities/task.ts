import { IUser } from './user';

export enum PRIORITY_ENUM {
  HOT = 'hot',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface TaskType {
  id: string;
  name: string;
  description: string;
  status: PRIORITY_ENUM;
  author: IUser;
  executor: IUser;
  hidden?: boolean;
  deadline?: string;
  priority_id?: string;
  executor_id?: string;
  estimate?: string;
  team_id?: string;
  start_at?: string;
  deadline_at?: string;
  sprint_id?: string;
  added_information?: string;
  hours?: string;
  status_id?: number;
}

export const PRIORITIES_TASK = [
  { name: 'Очень высокий', code: PRIORITY_ENUM.HOT },
  { name: 'Высокий', code: PRIORITY_ENUM.HIGH },
  { name: 'Средний', code: PRIORITY_ENUM.MEDIUM },
  { name: 'Низкий', code: PRIORITY_ENUM.LOW },
];
