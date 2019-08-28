import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/_models/user.model';
import { environment } from 'src/environments/environment';
import { Company } from 'src/_models/company.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  private PHP_API_SERVER: string;
  // private userLogged: User = null;
  private isUserLoggedIn = false;
  private userLogged: Usuario;
  isCompanyLoggedIn: boolean;
  companyLogged: Company;

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

  loginUser(employeeId: string, password: string) {
    // tslint:disable-next-line: prefer-const
    return this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      employeeId,
      password
    });
  }

  loginCompany(companyId: string, password: string) {
    // tslint:disable-next-line: prefer-const
    return this.http.post(`${this.PHP_API_SERVER}/api/readCompany.php`, {
      companyId,
      password
    });
  }

  isAdmin(): boolean | PromiseLike<boolean> {
    // tslint:disable-next-line: triple-equals
    if (this.userLogged != null && this.userLogged.permisos == 'Administrador') {
      return true;
    }
    return false;
  }

  private loadUser() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    if (this.userLogged != null) {
      this.isUserLoggedIn = true;
    } else {
      // this.debug('login.service: loadUser() = null!');
      this.isUserLoggedIn = false;
    }
    this.debug('login.service: loadUser() = ' + JSON.stringify(this.userLogged));
  }

  private loadCompany() {
    this.companyLogged = JSON.parse(localStorage.getItem('company'));
    if (this.companyLogged != null) {
      // this.debug('login.service: loadUser() = ' + JSON.stringify(this.userLogged));
      this.isCompanyLoggedIn = true;
    } else {
      // this.debug('login.service: loadUser() = null!');
      this.isCompanyLoggedIn = false;
    }
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  private removeCompany() {
    localStorage.removeItem('company');
  }

  isUserLogged(): boolean {
    this.loadUser();
    // this.debug(`login.service: isUserLogged() = ${this.isUserLoggedIn}`);
    return this.isUserLoggedIn;
  }

  isCompanyLogged(): boolean {
    this.loadCompany();
    // this.debug(`login.service: isUserLogged() = ${this.isUserLoggedIn}`);
    return this.isCompanyLoggedIn;
  }

  getEmployeeName() {
    this.loadUser();
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
      return this.companyLogged.nombreEmpresa;
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
    this.loadUser();
    return this.userLogged;
  }

  public getCompany() {
    this.loadCompany();
    return this.companyLogged;
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

  logoutCompany() {
    this.removeCompany();
    this.isCompanyLogged = null;
    this.companyLogged = null;
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
