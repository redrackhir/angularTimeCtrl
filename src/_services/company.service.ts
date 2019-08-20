import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from 'src/_models/company.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  companies: Company[];
  newCompany: Company;

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

  getCompaniesList(): Observable<Company[]> {
    const url = `${this.PHP_API_SERVER}/api/readCompanies.php`;
    console.log(`calling ${url}...`);
    return this.http.get<Company[]>(this.PHP_API_SERVER + '/api/readCompanies.php')
      .pipe(
        tap(),
        catchError(this.handleError<Company[]>('getCompaniesList', []))
      );
  }

  /** GET Company by id. Will 404 if id not found */
  getCompany(id: number): Observable<Company> {
    const url = `${this.PHP_API_SERVER}/api/getCompany.php?id=${id}`;
    console.log(`calling ${url}...`);
    return this.http.get<Company>(url).pipe(
      tap(_ => this.log(`Editar empresa [${id}]`, 'success')),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }

  /* /** GET Company by id. Return `undefined` when id not found
  getCompanyNo404<Company>(id: number): Observable<Company> {
    const url = `${this.PHP_API_SERVER}/companyDetail?id=${id}`;
    return this.http.get<Company[]>(url)
      .pipe(
        map(Companies => Companies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Company id=${id}`);
        }),
        catchError(this.handleError<Company>(`getCompany id=${id}`))
      );
  } */

  /* GET Companies whose name contains search term */
  searchCompany(term: string): Observable<Company[]> {
    if (!term.trim()) {
      // if not search term, return empty Company array.
      return of([]);
    }
    return this.http.get<Company[]>(`${this.PHP_API_SERVER}/?name=${term}`).pipe(
      tap(_ => this.log(`found Companyes matching "${term}"`, 'success')),
      catchError(this.handleError<Company[]>('searchCompanyes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Company to the server */
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.PHP_API_SERVER}/api/addCompany.php`, company, this.httpOptions).pipe(
      tap((company: Company) => this.log(`Nueva empresa añadida con id: [${company.codigoEmpresa}]`, 'success')),
      catchError(this.handleError<Company>('addCompany'))
    );
  }

  /** DELETE: delete the Company from the server */
  deleteCompany(company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.codigoEmpresa;
    const url = `${this.PHP_API_SERVER}/${id}`;

    return this.http.delete<Company>(url, this.httpOptions).pipe(
      tap(_ => this.log(`¡Empresa [${id}] eliminada!`, 'success')),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }

  /** PUT: update the Company on the server */
  updateCompany(company: Company): Observable<Company> {
    const url = `${this.PHP_API_SERVER}/api/updateCompany.php`;
    return this.http.put<Company>(url, company, this.httpOptions).pipe(
      tap(_ => this.log(`Empresa [${company.codigoEmpresa}] actualizada correctamente.`, 'success')),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

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

}
