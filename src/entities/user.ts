export interface IUser {
  id: string;
  first_name?: string;
  second_name?: string;
  middle_name?: string;
  api_token?: string;
  email?: string;
  works_hours_in_day?: number; //TODO сделать обязательным
}
