import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { take, tap } from "rxjs";
import { Employee } from "src/app/Employee/model/employee";
import { EmployeeService } from "src/app/Employee/services/employee.service";
import { GetEmployee, SetSelectedEmployee, AddEmployee, DeleteEmployee } from "../action/employee.action";


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

        return this.employee.getAppointment().pipe(
            tap(res => {
                const state = getState()
                setState({
                    ...state,
                    employees: res,
                    employeeLoaded: true
                })
            })
        )
    }

    // Get Employee Details to state
    @Action(SetSelectedEmployee)
    setSelectedEployee({ getState, setState }: StateContext<EmplyeeStateModel>, { id }: SetSelectedEmployee) {
        // return this.employee
        const state = getState();
        const empList = state.employees
        const index = empList.findIndex(emp => emp.id === id)

        if (empList.length > 0) {
            setState({
                ...state,
                selectedEmployee: empList[index]
            })
            return;
        } else {
            return this.employee.getAppointmentWithID(id).pipe(tap((res: Employee[]) => {

                const empList = [res];
                setState({
                    ...state,
                    employees: res,
                    selectedEmployee: res[0]
                })
            }))
        }
    }

    // Add Employee Details to state
    @Action(AddEmployee)
    addEmployee({ getState, patchState }: StateContext<EmplyeeStateModel>, { payload }: AddEmployee) {
        return this.employee.addAppointment(payload).pipe(tap((res: Employee) => {
            const state = getState()
            patchState({
                employees: [...state.employees, res]
            })
        }))
    }

    // Delete data to State
    @Action(DeleteEmployee)
    deleteEmployee({ getState, setState }: StateContext<EmplyeeStateModel>, { id }: DeleteEmployee) {
        return this.employee.deleteAppointment(id).pipe(tap(res=>{
            const state = getState();
            const filterdEmployee = state.employees.filter(emp => emp.id !== id)

            setState({
                ...state,
                employees: filterdEmployee,
                
            })
        }))
    }

}