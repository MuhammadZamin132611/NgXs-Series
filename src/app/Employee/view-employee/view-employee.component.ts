import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EmployeeState } from 'src/app/store/states/employee.state';
import { GetEmployee } from 'src/app/store/action/employee.action';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

  // Patients: Patients = new Patients();
  Patients: any;

  DataModalObj = {
    PatientName: "",
    Gender: "",
    MobileNo: "",
    IsRegistered: "",
    RegisteredDate: "",
    City: "",
    State: "",
    Country: "",
    Zip_Code: "",
    Latitude: "",
    Longitud: "",
  }

  constructor(private appointmentService: EmployeeService, private store: Store) {
  } 



  appointment: Employee | any = new Employee()

  ngOnInit(): void {

    this.getAllAppointment();
    this.Patients$.subscribe(res => {
      console.log("sdfgasdfg", res)
      this.Patients = res;
    })
  }

  @Select(EmployeeState.getEmployeeList) Patients$!: Observable<Employee[]>
  @Select(EmployeeState.employeeLoaded) employeeLoaded$!: Observable<boolean>

  empLoadedSub!: Subscription
  getAllAppointment() {
    this.empLoadedSub = this.employeeLoaded$.subscribe(res=>{
      if(!res){
        this.store.dispatch(new GetEmployee())
      }
    })
    // this.appointmentService.getAppointment().subscribe((appointment) => {
    //   this.Patients = appointment;
    // },
    //   (error) => {
    //     console.log(error);
    //   })
  }

  ngOnDestroy(): void {
    this.empLoadedSub.unsubscribe()
  }



  editAppointment(appointment: Employee) {
    this.appointmentService.setAppointment(appointment)
  }


  DeleteData(data: Employee) {
    this.appointmentService.deleteAppointment(data.id).subscribe();
    window.location.reload();
    // console.log(data.id)
  }
}
