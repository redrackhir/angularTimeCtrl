import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/_models/user.model';
import { environment } from 'src/environments/environment';
import { Company } from 'src/_models/company.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  userLogged: Usuario;
  isUserLoggedIn = false;
  companyLogged: Company = new Company('', '');
  // tslint:disable-next-line: variable-name

  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.companyLogged = this.loginService.getCompany();
    // Si no hay empresa logeada ir a login-empresa
    if (!this.loginService.isCompanyLoggedIn) {
      this.router.navigateByUrl('/company-login');
    } else {
      this.userLogged = this.loginService.getEmployee();
      // Si no hay usuario logeado continuar, o pasar a tablon principal
      if (this.loginService.isUserLogged()) {
        this.router.navigateByUrl('/dashboard');
      } else {
        if (this.userLogged != null) { this.router.navigateByUrl('/login'); }
      }
    }
    this.loading = false;
  }

  logIn(uid: string, password: string, rememberMe: any, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // this.debug('rememberMe = ' + rememberMe);
    const companyId = this.loginService.getCompany().codigoEmpresa;
    this.loading = true;
    // Login employee/user
    this.loginService.loginUser(uid, password, companyId).subscribe(resp => {
      if (resp != null) {
        // tslint:disable-next-line: no-string-literal
        if (resp['success'] === true) {
          this.isUserLoggedIn = true;
          // tslint:disable-next-line: no-string-literal
          this.userLogged = resp['user'];
          this.userLogged.recuerdame = rememberMe;
          // tslint:disable-next-line: no-string-literal
          // this.userLogged.codigoEmpresa = resp['codigoEmpresa'];
          this.saveUser(this.userLogged);
          this.debug('User permissions =' + this.userLogged.permisos);
          this.debug(`user & isUserLoggedIn = ${JSON.stringify(this.userLogged)} // ${this.isUserLoggedIn}`);
          this.navigate();
          this.loading = false;
        } else {
          this.alert = { class: 'alert alert-warning alert-dismissible fade show', msg: 'Usuario o contraseña incorrectos', show: true };
          this.loading = false;
        }
      } else {
        this.isUserLoggedIn = false;
        this.userLogged = null;
        // this.debug('no response from PHP');
        this.removeUser();
        this.loading = false;
      }
    }, error => {
      // this.debug('login.comp: error = ' + JSON.stringify(error));
      this.loading = false;
    });
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
    // this.debug('navigating to /dashboard...');
  }

  saveUser(empleado: Usuario) {
    // const values = [empleado.codigoEmpleado, empleado.nombreEmpleado, empleado.permisos];
    const minutos = 2;
    if (!empleado.recuerdame) {
      empleado.caducidad = new Date(new Date().getTime() + (60000 * minutos));
    } else {
      empleado.caducidad = null;
    }
    localStorage.setItem('user', JSON.stringify(empleado));
    this.debug(`login.service: user saved on local \'${JSON.stringify(empleado)}`);
  }

  saveCompany(empresa: Company) {
    // const values = [empresa.codigoEmpresa, empresa.nombreEmpresa];
    localStorage.setItem('company', JSON.stringify(empresa));
    // this.debug('login.service: user saved on local');
  }

  private removeUser() {
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.userLogged = null;
  }

  private removeCompany() {
    localStorage.removeItem('company');
    this.companyLogged = null;
  }


  logout(event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form
    this.loginService.logout();
    this.removeUser();
    this.navigate();
  }

  logoutCompany() {
    this.loginService.logoutCompany();
    this.removeCompany();
    this.router.navigateByUrl('/company-login');
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
