import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/_models/user.model';
import { Checkin } from 'src/_models/checkin.model';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  PHP_API_SERVER = 'http://127.0.0.1';
  // private userLogged: User = null;
/*   private isUserLoggedIn = false;
  private userLogged: User; */

  constructor(private http: HttpClient) {

   }

  readCheckins(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>(`${this.PHP_API_SERVER}/api/readCheckins.php`);
  }

  checkin(userId: number, fechahora: string) {
    // tslint:disable-next-line: prefer-const
    this.http.post(`${this.PHP_API_SERVER}/api/insertCheckin.php`, {
      userId,
      fechahora
    }).subscribe(resp => {
      console.log('checkin.service: response = ' + JSON.stringify(resp));
      if (resp['success']) {
        return true;
      } else {
        console.error(`Error PHP/SQL: ${resp['msg']}`);
        return false;
      }
    }, error => {
      console.log('checkin.service: error = ' + JSON.stringify(error));
      return false;
    });
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
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
        console.log('checkin.service: isUserLogged = ' + true);
        return true;
      } else {
        return false;
      }
    });
  }
   */

  /* getUserName() {
    console.log(`checkin.service: userLogged = ${JSON.stringify(this.userLogged)}`);
    return this.userLogged.NombreEmpleado; */
    /*
    return new Promise<string>(resolve => {
      if (this.isUserLogged()) {
        const userName = JSON.parse(localStorage.getItem('user'))['NombreEmpleado'];
        console.log('checkin.service: getUserName = ' + userName);
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
