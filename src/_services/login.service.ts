import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/_models/user.model';
import { environment } from 'src/environments/environment';
import { Company } from 'src/_models/company.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  private PHP_API_SERVER: string;
  // private userLogged: User = null;
  private isUserLoggedIn = false;
  private userLogged: Usuario;
  dbUse: string;
  isCompanyLoggedIn: boolean;
  companyLogged: Company;

  constructor(private http: HttpClient, private messageService: MessageService) {
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

  loginUser(employeeId: string, password: string, companyId: number) {
    // tslint:disable-next-line: prefer-const
    return this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      employeeId, password, companyId
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
    this.checkExpired();
    if (this.userLogged != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    this.debug('login.service: loadUser() = ' + JSON.stringify(this.userLogged));
  }

  private loadCompany() {
    this.companyLogged = JSON.parse(localStorage.getItem('company'));
    if (this.companyLogged != null) {
      this.isCompanyLoggedIn = true;
    } else {
      // this.debug('login.service: loadCompany() = null!');
      this.isCompanyLoggedIn = false;
    }
    this.debug('login.service: loadCompany() = ' + JSON.stringify(this.companyLogged));
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

  checkExpired() {
    if (this.userLogged == null) { return 0; }
    if (this.userLogged.recuerdame) { return 0; }
    const expireDate = this.userLogged.caducidad;
    this.debug(`Expire time ${expireDate}`);
    if (new Date(expireDate).getTime() > new Date().getTime()) {
      this.debug(`Remain ${(new Date(expireDate).getTime() - new Date().getTime())} miliseconds to expire`);
    } else {
      this.debug(`User expired time`);
      this.logout();
    }
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
    if (this.companyLogged != null) {
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

  getCanCheck() {
    // El usuario podrá fichar siempre que esté activado Y no sea un operario de taller
    this.debug(`canCheck (${this.userLogged.Operario} && ${this.userLogged.activo}) = ${this.userLogged.Operario == 0 && this.userLogged.activo != 0}`);
    return this.userLogged.Operario == 0 && this.userLogged.activo != 0;
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

  public getDbUse() {
    return this.dbUse;
  }

  public setDbUse(name: string) {
    this.dbUse = name;
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

  /** Log a message with the MessageService */
  private log(message: string, alertType: string) {
    this.messageService.add(message, alertType);
  }

}
