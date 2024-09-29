import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesService } from '../../../services/employees.service';
import { DataSource, Iemployee } from '../../../models/employee';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'title',
    'yearsOfExperience',
    'department',
    'action',
  ];
  employees: Iemployee[] = [];

  dataSource: DataSource[] = [];
  constructor(private _EmployeesService: EmployeesService,private _UsersService:UsersService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this._EmployeesService.getEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.employees = res;
        this.dataSource = res.map((emp) => ({
          id: emp.id,
          name: emp.name,
          title: emp.title,
          yearsOfExperience: emp.yOE,
          department: emp.department.name,
        }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteEmployeeById(id: string) {
    console.log(id);

    this._EmployeesService.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log(res);
        this.saveNewUser(res)
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saveNewUser(user:Iemployee){
  this._UsersService.saveNewUser(user).subscribe(
    {
      next: (res) => {
        console.log(res);
       
      },
      error: (err) => {
        console.log(err);
      },
    }
  )
  }
}
