import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesService } from '../../../services/employees.service';
import { DataSource, Iemployee } from '../../../models/employee';
import { UsersService } from '../../../services/users.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DepartmentsService } from '../../../services/departments.service';
import { Idepartment } from '../../../models/department';
import { NgIf } from '@angular/common';
import { IUser } from '../../../models/iuser';
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIf
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  displayedColumnsEmployeesTable: string[] = [
    'name',
    'title',
    'yearsOfExperience',
    'department',
    'action',
  ];
  displayedColumnsUsersTable: string[] = [
    'name',
    'title',
    'yearsOfExperience',
    'action',
  ];
  employees: Iemployee[] = [];
  users: IUser[] = []
  departments: Idepartment[] = [];
  dataSource: Iemployee[] = [];
  usersData:IUser[]=[]
  @ViewChild('myForm') myForm!: NgForm;  // Access the form via ViewChild

  constructor(
    private _EmployeesService: EmployeesService,
    private _UsersService: UsersService,
    private _DepartmentsService: DepartmentsService
  ) {}
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllDepartments();
    // this.getAllUsers()
  }

  getAllEmployees() {
    this._EmployeesService.getEmployees().subscribe({
      next: (res) => {
        console.log(res);
        this.employees = res;
        this.dataSource = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllUsers() {
    this._UsersService.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
        this.usersData = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllDepartments() {
    this._DepartmentsService.getDepartments().subscribe({
      next: (res) => {
        this.departments = res;
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
        this.saveNewUser({...res,department:res.department.id});
        this.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saveNewUser(user: IUser) {
    this._UsersService.saveNewUser(user).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteUserById(id:string){
    this._UsersService.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllEmployees()
        this.search(this.myForm.value.name,this.myForm.value.department)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saveNewEmp(user: IUser) {
    console.log(user);
   const dep= this.departments.find((dep)=>dep.id == user.department )
    if(dep){
      this._EmployeesService.saveNewEmployee({...user,department:dep}).subscribe({
        next: (res) => {
          console.log(res);
          this.deleteUserById(user.id)
         
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
   
  }
  search(name:string,dep:number){
    this._UsersService.search(name,dep).subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
        this.usersData = res
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      this.search(form.value.name,form.value.department)
    } else {
      console.log('Form is invalid');
    }
  }
  onReset(form: any) {
    form.reset();
    this.usersData=[]
  }
}
