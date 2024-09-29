import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Iemployee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private _HttpClient: HttpClient) {}

  getEmployees(): Observable<Iemployee[]> {
    return this._HttpClient.get<Iemployee[]>(
      `${environment.baseUrl}/employees`
    );
  }
  saveNewEmployee(employee: Iemployee): Observable<Iemployee> {
    return this._HttpClient.post<Iemployee>(
      `${environment.baseUrl}/employees`,
      JSON.stringify(employee)
    );
  }
  deleteEmployee(id: string): Observable<Iemployee> {
    return this._HttpClient.delete<Iemployee>(
      `${environment.baseUrl}/employees/${id}`
    );
  }
}
