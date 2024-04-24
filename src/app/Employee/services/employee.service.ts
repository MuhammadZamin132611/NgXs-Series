import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }
  
  getAppointment() {
    return this.http.get<Employee[]>(this.url + `/employee`).pipe(map((response) => {
      return response;
    }))
  }

  addAppointment(appointment: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url+`/employee`, appointment);
  }


  temp!:Employee;
  setAppointment(data:Employee){
    this.temp = data;
  }

  editAppointment(appointment:Employee){
    return this.http.put(this.url+`/employee/`+appointment.id,appointment);
  }

  deleteAppointment(id:Employee){
    return this.http.delete(this.url+`/employee/`+id);
  }
}
