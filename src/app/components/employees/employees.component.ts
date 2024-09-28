import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
export interface PeriodicElement {
  name: string;
  title: string;
  yearsOfExperience: number;
  department: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', title: 'Hydrogen', yearsOfExperience: 2,department:'Marketing'},
  { name: 'Helium', title: 'Hydrogen', yearsOfExperience: 3,department:'HR'},
  { name: 'Lithium', title:'Hydrogen', yearsOfExperience: 8,department:'Technical'},
  { name: 'Beryllium', title: 'Hydrogen', yearsOfExperience: 10,department:'Hr'},
 
];
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatSidenavModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  displayedColumns: string[] = ['name', 'title', 'yearsOfExperience', 'department',"action"];
  dataSource = ELEMENT_DATA;
  shouldRun =true;
}
