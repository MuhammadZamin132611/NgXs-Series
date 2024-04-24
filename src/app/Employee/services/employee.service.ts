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
    return this.http.get<Employee[]>(this.url + `/employee`)
  }

  addAppointment(appointment: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url+`/employee`, appointment);
  }

  getAppointmentWithID(id:string) {
    return this.http.get<Employee[]>(this.url + `/employee/${id}`)
  }
  
  editAppointment(id:Employee){
    return this.http.put(`http://localhost:3000/employee?id=${id.id}`,id);
  }

  deleteAppointment(id:Employee){
    return this.http.delete(this.url+`/employee/`+id);
  }
}
