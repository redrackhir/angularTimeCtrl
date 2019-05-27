import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginService } from 'src/_services';

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

  constructor(loginService: LoginService) {
    this._loginService = loginService;
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.getLogged();
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
    this.userLoggedName = await this._loginService.getUserName() as string;
    this.isUserLogged = await this._loginService.isUserLogged() as boolean;
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLogged = false;
  }
}
