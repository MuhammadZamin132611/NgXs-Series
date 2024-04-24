import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  appointment: Employee | any = new Employee();
  addForm = new FormGroup({
    title: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    time: new FormControl("", Validators.required),
    patient: new FormControl("", Validators.required),
    doctor: new FormControl("", Validators.required),
    reason: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required)
  })
  Patients: Employee[] = [];
  constructor(private empService: EmployeeService, private router: Router) {}

  data: any;
  date: Date | any;
  minDate: string = '';
  ngOnInit() {

    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    this.minDate = currentDate.toISOString().split('T')[0];

    // this.getAllAppointment();
    this.date = new Date().toJSON().split('T'[0])
  }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) { return }
    else {
      this.Appointment();
      this.router.navigate(['viewEmloyee']);

    }

  }
  submitted: boolean = false;
  get add() {
    return this.addForm.controls
  }

  Appointment() {
    this.checkIfAppointmentIsSubmitted();
    this.appointment.title = this.addForm.value.title;
    this.appointment.date = this.addForm.value.date;
    this.appointment.time = this.addForm.value.time;
    this.appointment.patient = this.addForm.value.patient;
    this.appointment.doctor = this.addForm.value.doctor;
    this.appointment.reason = this.addForm.value.reason;
    this.appointment.description = this.addForm.value.description;


    this.empService.addAppointment(this.appointment).subscribe();
  }

  checkIfAppointmentIsSubmitted() {

    if (this.addForm.invalid) {
      this.submitted = false;
    }

    this.submitted = true
  }

  //This is the status variable that has to be set and returned to the caller
  isDateValid: Boolean = false;
  checkIfAppointmentDateIsNotGreaterThan30Days(appointmentDate: Date) {
    appointmentDate = new Date;

    this.isDateValid = true;
    return this.isDateValid;

  }

  isTimeValid: Boolean = false;
  checkIfAppointmentTimeIsValid() {
    this.isTimeValid = true;
    return this.isTimeValid;
  }

  // getAllAppointment() {
  //   this.empService.getAppointment().subscribe((appointment) => {
  //     this.Patients = appointment;
  //   },
  //     (error) => {
  //       console.log(error);
  //     })
  // }
}
