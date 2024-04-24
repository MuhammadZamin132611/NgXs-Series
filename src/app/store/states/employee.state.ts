import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Employee } from "src/app/Employee/model/employee";
import { EmployeeService } from "src/app/Employee/services/employee.service";
import { GetEmployee, SetSelectedEmployee } from "../action/employee.action";


// State Model
export interface EmplyeeStateModel {
    employees: Employee[];
    employeeLoaded: boolean;
    selectedEmployee?: Employee;
}

// State
@State<EmplyeeStateModel>({
    name: 'employees',
    defaults: {
        employees: [],
        employeeLoaded: false,
        selectedEmployee: undefined
    }
})

@Injectable()
export class EmployeeState {

    constructor(private employee: EmployeeService) { }
    // Selector has logic to get data

    // Get Employee list from state
    @Selector()
    static getEmployeeList(state: EmplyeeStateModel) {
        return state.employees
    }

    // Get loaded Employee info
    @Selector()
    static employeeLoaded(state: EmplyeeStateModel) {
        return state.employeeLoaded
    }

    // Get Selected employee fron state
    @Selector()
    static selectedEmployee(state: EmplyeeStateModel) {
        return state.selectedEmployee
    }

    @Action(GetEmployee)
    getEmployees({ getState, setState }: StateContext<EmplyeeStateModel>) {
        // console.log('State Action')
        return this.employee.getAppointment().pipe(
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

    @Action(SetSelectedEmployee)
    setSelectedEployee({ getState, setState }: StateContext<EmplyeeStateModel>, { id }: SetSelectedEmployee) {
        // return this.employee
        const state = getState();
        const empList = state.employees

        const index = empList.findIndex(emp => emp.id === id)
        console.log("check id", empList[index]);

        setState({
            ...state,
            selectedEmployee: empList[index]
        })
    }
}