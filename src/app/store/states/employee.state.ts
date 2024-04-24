import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Employee } from "src/app/Employee/model/employee";
import { EmployeeService } from "src/app/Employee/services/employee.service";
import { GetEmployee } from "../action/employee.action";


// State Model
export class EmplyeeStateModel {
    employees: Employee[] = [];
    employeeLoaded: boolean = false
}

// State
@State<EmplyeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeeLoaded: false
    }
})

@Injectable()
export class EmployeeState {

    constructor(private appointment: EmployeeService) { }
    // Selector has logic to get data

    // Get Employee list from state
    @Selector()
    static getEmployeeList(state: EmplyeeStateModel) {
        return state.employees
    }

    // Get loaded Employee info
    @Selector()
    static employeeLoaded(state: EmplyeeStateModel){
        return state.employeeLoaded
    }

    @Action(GetEmployee)
    getEmployees({ getState, setState }: StateContext<EmplyeeStateModel>) {
        // console.log('State Action')
        return this.appointment.getAppointment().pipe(
            tap(res => {
                // console.log('Tap Responce',res)
                const state = getState()
                // console.log('State Responce',state)
                setState({
                    ...state,
                    employees: res,
                    employeeLoaded: true
                })
            })
        )
    }
}