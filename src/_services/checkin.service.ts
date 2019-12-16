import { Injectable, enableProdMode } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/_models/user.model';
import { Checkin } from 'src/_models/checkin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  private PHP_API_SERVER: string;
  // private userLogged: User = null;
  /*   private isUserLoggedIn = false;
  private userLogged: User; */
  private lastTransac: any;

  constructor(private http: HttpClient) {
    this.lastTransac = { result: false, msg: 'nothing' };
    if (environment.production) {
      this.PHP_API_SERVER = '';
    } else {
      this.PHP_API_SERVER = 'http://127.0.0.1';
    }
  }

  readCheckins(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>(`${this.PHP_API_SERVER}/api/readCheckins.php`);
  }

  readFilteredCheckins(companyId: number, employeeId: string, dateAndTime: string): Observable<Checkin[]> {
    return this.http.post<Checkin[]>(`${this.PHP_API_SERVER}/api/readFilteredCheckins.php`, {
      companyId,
      employeeId,
      dateAndTime
    });
  }

  checkin(companyId: number, employeeId: string, dateAndTime: string, coords: any) {
    // event.preventDefault();
    // tslint:disable-next-line: prefer-const
    // this.debug(`registering ${employeeId}, ${dateAndTime}`);
    return this.http.post(`${this.PHP_API_SERVER}/api/insertCheckin.php`, {
      companyId,
      employeeId,
      dateAndTime,
      coords
    });
  }

  deleteCheckin(uid: number) {
    return this.http.post(`${this.PHP_API_SERVER}/api/deleteCheckin.php`, {
      uid
    });
  }

  saveUser(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getLastTransacc() {
    return this.lastTransac;
  }

  public setLastTransacc(value: boolean) {
    this.lastTransac = value;
  }


  updateCheckin(checkin: Checkin) {
    return this.http.put<Checkin>(`${this.PHP_API_SERVER}/api/updateCheckin.php`, checkin);
  }

  /*   logout() {
      // remove user from local storage to log user out
      this.removeUser();
      this.isUserLoggedIn = false;
      this.userLogged = null;
    } */
}
