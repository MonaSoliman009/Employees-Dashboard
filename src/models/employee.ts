import { Idepartment } from "./department";

export interface Iemployee {
    id: string;
    name: string,
    title: string,
    yOE: number,
    department:Idepartment
}

export interface DataSource {
    name: string,
    title: string,
    yearsOfExperience: number,
    department:string
}
