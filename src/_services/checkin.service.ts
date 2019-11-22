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

  /* loadUser() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    if (this.userLogged.NombreEmpleado != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn =false;
    }
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  isUserLogged(): boolean {
    return this.isUserLoggedIn; */
  /*
  return new Promise<boolean>(resolve => {
    if (localStorage.getItem('user') != null) {
      // this.debug('checkin.service: isUserLogged = ' + true);
      return true;
    } else {
      return false;
    }
  });
}
 */

  /* getUserName() {
    // this.debug(`checkin.service: userLogged = ${JSON.stringify(this.userLogged)}`);
    return this.userLogged.NombreEmpleado; */
  /*
  return new Promise<string>(resolve => {
    if (this.isUserLogged()) {
      const userName = JSON.parse(localStorage.getItem('user'))['NombreEmpleado'];
      // this.debug('checkin.service: getUserName = ' + userName);
      return userName;
    } else {
      return null;
    }
  })
}
 */

  /* updateUser(user: User) {
    return this.http.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }
 */
  /*   logout() {
      // remove user from local storage to log user out
      this.removeUser();
      this.isUserLoggedIn = false;
      this.userLogged = null;
    } */
}
