import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {
  appointment: Employee | any = new Employee();

  editForm = new FormGroup({
    title: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl(""),
    patient: new FormControl(""),
    doctor: new FormControl(""),
    reason: new FormControl(""),
    description: new FormControl("")
  })

  constructor(private emptService: EmployeeService,private route:Router,){

  }
  ngOnInit(): void {
    this.appointment = this.emptService.temp;
  }
  Appointment(){
    this.emptService.editAppointment(this.appointment).subscribe();
    this.route.navigate(['viewEmloyee']);
  }

}
