import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EmployeeState } from 'src/app/store/states/employee.state';
import { DeleteEmployee, GetEmployee } from 'src/app/store/action/employee.action';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {

  appointment: Employee | any = new Employee()
  Patients: any;
  constructor(private appointmentService: EmployeeService, private store: Store) {} 

  ngOnInit(): void {
    this.getAllAppointment();
    this.Patients$.subscribe(res => {
      // console.log("sdfgasdfg", res)
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
  }

  ngOnDestroy(): void {
    this.empLoadedSub.unsubscribe()
  }

 

  DeleteData(data: Employee) {
    // console.log(data.id)
    this.store.dispatch(new DeleteEmployee(data.id))
    // this.appointmentService.deleteAppointment(data.id).subscribe(res=>{
    //   console.log(res)
    // });
    // window.location.reload();
  }
}
