import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './Employee/view-employee/view-employee.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';

const routes: Routes = [
  {path:'',component:AddEmployeeComponent},
  {path:'viewEmloyee',component:ViewEmployeeComponent},
  {path:'edit/:id',component:EditEmployeeComponent},
  {path:'edit',component:EditEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
