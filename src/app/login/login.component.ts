import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/_models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  private userLogged: User;
  private isUserLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = false;
    this.userLogged = { companyId: 0, uid: 0, NombreEmpleado: '', ppin: '', accessLevel: '0' };
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;

    this.loginService.login(username, password);
    console.log('Respuesta de loginService = ' + this.loginService.isUserLogged());
    this.loading = false;
    if (this.loginService.isUserLogged()) {
      this.navigate();
    }
    // Calls service to login user to the api rest

    /*
    this.loginService.login(username, password).subscribe(
      contentData = content.map(
      (data) => data.name
    )
    */ /*
      res => {
        console.log('Valor retornado de PHP: ' + res);

        if (res['success']) {
          // tslint:disable-next-line: no-string-literal
          this.userLogged = res['user'];
          this.isUserLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(this.userLogged));
        }
      },
      error => {
        console.error(error);
      },

      () => this.navigate()
      );
      */
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
    console.log('navigating to /dashboard...');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
