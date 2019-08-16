import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/_models/employee.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  employees: Employee[];
  newEmployee: Employee;

  private PHP_API_SERVER: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {
    if (environment.production) {
      this.PHP_API_SERVER = '';
    } else {
      this.PHP_API_SERVER = 'http://127.0.0.1';
    }
  }

  getEmployeesList(): Observable<Employee[]> {
    const url = `${this.PHP_API_SERVER}/api/readEmployees.php`;
    console.log(`calling ${url}...`);
    return this.http.get<Employee[]>(this.PHP_API_SERVER + '/api/readEmployees.php')
      .pipe(
        tap(),
        catchError(this.handleError<Employee[]>('getEmployeesList', []))
      );
  }

  /** GET Employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.PHP_API_SERVER}/api/getEmployee.php?id=${id}`;
    console.log(`calling ${url}...`);
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  /* /** GET Employee by id. Return `undefined` when id not found
  getEmployeeNo404<Employee>(id: number): Observable<Employee> {
    const url = `${this.PHP_API_SERVER}/employeeDetail?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(Employees => Employees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Employee id=${id}`);
        }),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  } */

  /* GET Employees whose name contains search term */
  searchEmployee(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty Employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.PHP_API_SERVER}/?name=${term}`).pipe(
      tap(_ => this.log(`found Employeees matching "${term}"`)),
      catchError(this.handleError<Employee[]>('searchEmployeees', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Employee to the server */
  addEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.PHP_API_SERVER}/api/addEmployee.php`, employee, this.httpOptions).pipe(
      tap((employee: Employee) => this.log(`added Employee w/ id=${employee.codigoEmpleado}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  /** DELETE: delete the Employee from the server */
  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.codigoEmpresa;
    const url = `${this.PHP_API_SERVER}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** PUT: update the Employee on the server */
  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.PHP_API_SERVER}/api/updateEmployee.php?id=${employee.codigoEmpleado}`;
    return this.http.put(url, employee).pipe(
      tap(_ => this.log(`updated Employee id=${employee.codigoEmpleado}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }

}
