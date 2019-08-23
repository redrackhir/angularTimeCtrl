import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from 'src/_models/user.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  private userLogged: Usuario;
  private isUserLoggedIn = false;
  private _loginService: LoginService;
  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this._loginService = loginService;
    // this.debug('login component (constructor): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
  }

  ngOnInit() {
    // this.debug('login component (onInit): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
    if (this._loginService.isUserLogged()) { this.router.navigateByUrl('/dashboard'); }
    this.loading = false;
    this.userLogged = this._loginService.getEmployee();
    if (this.userLogged != null) { this.navigate(); }
  }

  logIn(employeeId: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;

    this._loginService.login(employeeId, password).subscribe(resp => {
      // this.debug('login.comp: response = ' + JSON.stringify(resp));
      if (resp != null) {
        // tslint:disable-next-line: no-string-literal
        if (resp['success'] === true) {
          this.isUserLoggedIn = true;
          // tslint:disable-next-line: no-string-literal
          this.userLogged = resp['user'];
          // tslint:disable-next-line: no-string-literal
          //this.userLogged.codigoEmpresa = resp['codigoEmpresa'];
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
    localStorage.setItem('user', JSON.stringify(empleado));
    // this.debug('login.service: user saved on local');
  }

  private removeUser() {
    localStorage.removeItem('user');
  }

  logout() {
    this._loginService.logout();
    this.removeUser();
    this.isUserLoggedIn = false;
    this.userLogged = null;
    this.navigate();
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
