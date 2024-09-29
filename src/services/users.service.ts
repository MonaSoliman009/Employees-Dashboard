import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iemployee } from '../models/employee';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}

  getUsers(): Observable<Iemployee[]> {
    return this._HttpClient.get<Iemployee[]>(`${environment.baseUrl}/users`);
  }

  saveNewUser(user: Iemployee): Observable<Iemployee> {
    return this._HttpClient.post<Iemployee>(
      `${environment.baseUrl}/users`,
      JSON.stringify(user)
    );
  }
}
