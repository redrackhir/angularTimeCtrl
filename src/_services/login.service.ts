import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/_models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  private PHP_API_SERVER: string;
  // private userLogged: User = null;
  private isUserLoggedIn = false;
  private userLogged: Usuario;

  constructor(private http: HttpClient) {
    this.loadUser();
    // this.debug('login.service: constructor');
    if (environment.production) {
      this.PHP_API_SERVER = '';
    } else {
      this.PHP_API_SERVER = 'http://127.0.0.1';
    }
    // this.debug(` ....environment.production = ${environment.production}; API_SERV = ${this.PHP_API_SERVER}`);
  }

  readUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  login(employeeId: string, password: string) {
    // tslint:disable-next-line: prefer-const
    return this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      employeeId,
      password
    });
  }
  /*
    .subscribe(resp => {
    // this.debug('login.service: response = ' + JSON.stringify(resp));
      // tslint:disable-next-line: no-string-literal
      if (resp != null) {
        if (resp['success'] === true) {
          this.isUserLoggedIn = true;
          // tslint:disable-next-line: no-string-literal
          this.userLogged = resp['user'];
          this.saveUser(this.userLogged);
        // this.debug(`user & userLogged = ${this.userLogged} // ${this.isUserLoggedIn}`);
          return true;
          retval = true;
        }
      } else {
        this.isUserLoggedIn = false;
        this.userLogged = null;
        this.removeUser();
      // this.debug('no response from PHP');
      }
    }, error => {
    // this.debug('login.service: error = ' + JSON.stringify(error));
    });
    return retval;
  }
  */

  /*   saveUser(empleado: Empleado) {
      localStorage.setItem('user', JSON.stringify(empleado));
    // this.debug('login.service: user saved on local');
    } */
  isAdmin(): boolean | PromiseLike<boolean> {
    // throw new Error("Method not implemented.");
    // tslint:disable-next-line: triple-equals
    // this.debug('isAdmin = ' + this.userLogged.permisos);
    if (this.userLogged != null && this.userLogged.permisos == 'Administrador') {
      return true;
    }
    return false;
  }

  private loadUser() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    if (this.userLogged != null) {
      // this.debug('login.service: loadUser() = ' + JSON.stringify(this.userLogged));
      this.isUserLoggedIn = true;
    } else {
      // this.debug('login.service: loadUser() = null!');
      this.isUserLoggedIn = false;
    }
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  isUserLogged(): boolean {
    this.loadUser();
    // this.debug(`login.service: isUserLogged() = ${this.isUserLoggedIn}`);
    return this.isUserLoggedIn;
    /*
    return new Promise<boolean>(resolve => {
      if (localStorage.getItem('user') != null) {
      // this.debug('login.service: isUserLogged = ' + true);
        return true;
      } else {
        return false;
      }
    });
    */
  }

  getEmployeeName() {
    if (this.userLogged != null) {
      // this.debug(`login.service: getUserName() = ${JSON.stringify(this.userLogged.nombreEmpleado)}`);
      return this.userLogged.nombreEmpleado;
    } else {
      // this.debug(`login.service: getUserName() = null`);
      return null;
    }
  }

  getCompanyName() {
    if (this.userLogged != null) {
      // this.debug(`login.service: getUserName() = ${JSON.stringify(this.userLogged.nombreEmpleado)}`);
      return this.userLogged.nombreEmpresa;
    } else {
      // this.debug(`login.service: getUserName() = null`);
      return null;
    }
  }

  getPermissionLevel() {
    if (this.userLogged != null) {
      // this.debug(`login.service: getUserName() = ${JSON.stringify(this.userLogged.nombreEmpleado)}`);
      return this.userLogged.permisos;
    } else {
      // this.debug(`login.service: getUserName() = null`);
      return null;
    }
  }

  getLastClockin() {
    if (this.userLogged != null) {
      // this.debug(`login.service: getUserName() = ${JSON.stringify(this.userLogged.nombreEmpleado)}`);
      return this.userLogged.permisos;
    } else {
      // this.debug(`login.service: getUserName() = null`);
      return null;
    }
  }


  public getEmployee() {
    return this.userLogged;
  }

  updateUser(user: Usuario) {
    return this.http.put<Usuario>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  logout() {
    // remove user from local storage to log user out
    this.removeUser();
    this.isUserLoggedIn = false;
    this.userLogged = null;
  }
}
