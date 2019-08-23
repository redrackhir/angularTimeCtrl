import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clockin } from 'src/_models/clockin.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class ClockinService {

  clockins: Clockin[];
  newClockin: Clockin;

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

  getClockinsList(idEmpresa: number, idEmpleado: number, filterWeek: number,
                  filterMonth: number, filterYear: number): Observable<Clockin[]> {
    // tslint:disable-next-line: max-line-length
    const url = `${this.PHP_API_SERVER}/api/readClockins.php?idEmpresa=${idEmpresa}&idEmpleado=${idEmpleado}&week=${filterWeek}&month=${filterMonth}&year=${filterYear}`;
    this.debug(`calling ${url}...`);
    return this.http.get<Clockin[]>(url)
      .pipe(
        tap(),
        catchError(this.handleError<Clockin[]>('getClockinsList', []))
      );
  }

  getLastClockin(idEmpleado: number): Observable<any> {
    const url = `${this.PHP_API_SERVER}/api/getLastClockin.php?id=${idEmpleado}`;
    return this.http.get<any>(url)
      .pipe(
        tap(),
        catchError(this.handleError<any>('getLastClockin'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.debug(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`, 'danger');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string, alertType: string) {
    this.messageService.add(message, alertType);
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
