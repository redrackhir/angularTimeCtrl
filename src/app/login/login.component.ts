import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = false;
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;
    // Calls service to login user to the api rest
    this.loginService.login(username, password).subscribe(
      /*
      contentData = content.map(
      (data) => data.name
    )
      */
      res => {
        console.log('Valor retornado de PHP: ' + JSON.stringify(res));
        if (res.success) {
          localStorage.setItem('loggedUser', res.empleado);
        }
      },
      error => {
        console.error(error);
      },

      () => this.navigate()
    );
    this.loading = false;
  }

  navigate() {
    this.router.navigateByUrl('/home');
  }

  logout() {
    localStorage.removeItem('user');
  }
}
