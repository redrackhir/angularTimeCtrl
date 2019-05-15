import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PC\'s\'Time';
  isUserLogged: boolean;
  userLogged: string;

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.userLogged = localStorage.getItem('user');
    if (!this.userLogged) {
      this.isUserLogged = false;
    } else {
      this.isUserLogged = true;
      console.log(this.userLogged);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLogged = false;
  }
}
