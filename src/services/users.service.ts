import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iemployee } from '../models/employee';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { IUser } from './../models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._HttpClient.get<IUser[]>(`${environment.baseUrl}/users`);
  }

  search(name:string,department:number): Observable<IUser[]>{
    return this._HttpClient.get<IUser[]>(`${environment.baseUrl}/users?name=${name}&department=${department}`);

  }
  saveNewUser(user: IUser): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${environment.baseUrl}/users`,
      JSON.stringify(user)
    );
  }
  deleteUser(id: string): Observable<IUser> {
    return this._HttpClient.delete<IUser>(
      `${environment.baseUrl}/users/${id}`
    );
  }
}
