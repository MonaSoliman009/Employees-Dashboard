import { Idepartment } from "./department";

export interface IUser {
  id: string;
  name: string;
  title: string;
  yOE: number;
  department: number;
}
export interface UsersDataSource {
  name: string;
  title: string;
  yearsOfExperience: number;
}
