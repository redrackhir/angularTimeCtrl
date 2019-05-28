import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Empleado } from 'src/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  PHP_API_SERVER = 'http://127.0.0.1';
  // private userLogged: User = null;
  private isUserLoggedIn = false;
  private userLogged: Empleado;

  constructor(private http: HttpClient) {
    this.loadUser();
    console.log('login.service: constructor');
    console.log(`....userLogged = ${JSON.stringify(this.userLogged)}`);
   }

  readUsers(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  login(employeeId: string, password: string) {
    // tslint:disable-next-line: prefer-const
    this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      employeeId,
      password
    }).subscribe(resp => {
      console.log('login.service: response = ' + JSON.stringify(resp));
      // tslint:disable-next-line: no-string-literal
      if (resp['success']) {
        this.isUserLoggedIn = true;
        // tslint:disable-next-line: no-string-literal
        this.userLogged = resp['user'];
        this.saveUser(this.userLogged);
        console.log('isUserLoggedIn = ' + this.isUserLoggedIn);
        return true;
      } else {
        this.isUserLoggedIn = false;
        this.userLogged = null;
        this.removeUser();
        console.log('isUserLoggedIn = ' + this.isUserLoggedIn);
        return false;
      }
    }, error => {
      console.log('login.service: error = ' + JSON.stringify(error));
      return false;
    });
  }

  private saveUser(empleado: Empleado) {
    localStorage.setItem('user', JSON.stringify(empleado));
  }

  private loadUser() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    if (this.userLogged != null) {
      console.log('login.service: loadUser() = ' + JSON.stringify(this.userLogged));
      this.isUserLoggedIn = true;
    } else {
      console.error('login.service: loadUser() = null!');
      this.isUserLoggedIn = false;
    }
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  isUserLogged(): boolean {
    this.loadUser();
    console.log(`login.service: isUserLogged() = ${this.isUserLoggedIn}`);
    return this.isUserLoggedIn;
    /*
    return new Promise<boolean>(resolve => {
      if (localStorage.getItem('user') != null) {
        console.log('login.service: isUserLogged = ' + true);
        return true;
      } else {
        return false;
      }
    });
    */
  }

  getUserName() {
    if (this.userLogged != null ) {
      console.log(`login.service: getUserName() = ${JSON.stringify(this.userLogged.nombreEmpleado)}`);
      return this.userLogged.nombreEmpleado;
    } else {
      console.log(`login.service: getUserName() = null`);
      return null;
    }
    /*
    return new Promise<string>(resolve => {
      if (this.isUserLogged()) {
        const userName = JSON.parse(localStorage.getItem('user'))['NombreEmpleado'];
        console.log('login.service: getUserName = ' + userName);
        return userName;
      } else {
        return null;
      }
    })
    */
  }

  getUser() {
    return this.userLogged;
  }

  updateUser(user: Empleado) {
    return this.http.put<Empleado>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  logout() {
    // remove user from local storage to log user out
    this.removeUser();
    this.isUserLoggedIn = false;
    this.userLogged = null;
  }
}
