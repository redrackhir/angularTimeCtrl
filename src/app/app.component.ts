import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginService } from 'src/_services';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PC\'s\'Time';
  isUserLogged: boolean;
  userLoggedName: string;
  private _loginService: LoginService;

  constructor(private router: Router, loginService: LoginService) {
    this._loginService = loginService;
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('route event = ' + event);
        // Actualiza si está logeado
        this.getLogged();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    /*
    this.userLoggedName = localStorage.getItem('user');
    if (!this.userLoggedName) {
      this.isUserLogged = false;
    } else {
      this.isUserLogged = true;
      console.log(this.userLoggedName);
    }
    */
  }

  private async getLogged() {
    this.isUserLogged = await this._loginService.isUserLogged() as boolean;
    this.userLoggedName = await this._loginService.getUserName() as string;
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLogged = false;
  }
}
