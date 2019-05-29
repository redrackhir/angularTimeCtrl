import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Empleado } from 'src/_models/user.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  private userLogged: Empleado;
  private isUserLoggedIn = false;
  private _loginService: LoginService;
  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this._loginService = loginService;
    // console.log('login component (constructor): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
  }

  ngOnInit() {
    // console.log('login component (onInit): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
    if (this._loginService.isUserLogged()) { this.router.navigateByUrl('/dashboard'); }
    this.loading = false;
    this.userLogged = this._loginService.getEmployee();
    if (this.userLogged != null) { this.navigate(); }
  }

  logIn(employeeId: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;

    this._loginService.login(employeeId, password).subscribe(resp => {
      // console.log('login.comp: response = ' + JSON.stringify(resp));
      // tslint:disable-next-line: no-string-literal
      if (resp != null) {
        if (resp['success'] === true) {
          this.isUserLoggedIn = true;
          // tslint:disable-next-line: no-string-literal
          this.userLogged = resp['user'];
          // console.log(`user & userLogged = ${this.userLogged} // ${this.isUserLoggedIn}`);
          this.saveUser(this.userLogged);
          this.navigate();
          this.loading = false;
        } else {
          this.alert = { class: 'alert alert-warning alert-dismissible fade show', msg: 'Usuario o contraseña incorrectos', show: true };
          this.loading = false;
        }
      } else {
        this.isUserLoggedIn = false;
        this.userLogged = null;
        // console.error('no response from PHP');
        this.removeUser();
        this.loading = false;
      }
    }, error => {
      // console.log('login.comp: error = ' + JSON.stringify(error));
      this.loading = false;
    });
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
    // console.log('navigating to /dashboard...');
  }

  saveUser(empleado: Empleado) {
    localStorage.setItem('user', JSON.stringify(empleado));
    // console.log('login.service: user saved on local');
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
}
