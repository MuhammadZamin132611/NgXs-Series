import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEmployee } from 'src/app/store/action/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from 'src/app/store/states/employee.state';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnDestroy {
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

  constructor(private emptService: EmployeeService,private route:Router, private activeRoute:ActivatedRoute, private store:Store){}
  
  storeEmploye:any;
  ngOnInit(): void {
    // this.appointment = this.emptService.temp;
    this.activeRoute.queryParams.subscribe((res:any)=>{
      this.storeEmploye = res;
      let id = res.id;
      this.Appointment(id);
      console.log("edit",this.storeEmploye) 
    })
  }
  employee:any

  @Select(EmployeeState.selectedEmployee) selectedEmployee$!: Observable<Employee>
  selectedEmpSub!:Subscription
  Appointment(id:any){
    this.store.dispatch(new SetSelectedEmployee(id));
    this.selectedEmpSub = this.selectedEmployee$.subscribe(res=>{
      // console.log("selected employee", res)
      this.employee = res
    })
  }

  ngOnDestroy(): void {
    this.selectedEmpSub.unsubscribe();
  }
  

}
