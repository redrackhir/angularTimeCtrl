import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { Empleado } from 'src/_models/user.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';

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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this._loginService = loginService;
    console.log('login component (constructor): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
  }

  ngOnInit() {
    console.log('login component (onInit): this._loginService.isUserLogged() = ' + this._loginService.isUserLogged());
    if (this._loginService.isUserLogged()) { this.router.navigateByUrl('/dashboard'); }
    this.loading = false;
    this.userLogged = this._loginService.getUser();
    if (this.userLogged != null) { this.navigate(); }
  }

  logIn(employeeId: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;

    this.loginService.login(employeeId, password);
    console.log('Respuesta de loginService = ' + this.loginService.isUserLogged());

    this.loading = false;
    if (this.loginService.isUserLogged()) {
      this.navigate();
    }
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
    console.log('navigating to /dashboard...');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
