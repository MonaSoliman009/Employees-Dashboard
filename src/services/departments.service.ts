import { Injectable } from '@angular/core';
import { Idepartment } from '../models/department';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private _HttpClient:HttpClient) { }

  getDepartments():Observable<Idepartment[]>{
    return this._HttpClient.get<Idepartment[]>(`${environment.baseUrl}/departments`)
  }
}
