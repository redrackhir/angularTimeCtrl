import { Component } from '@angular/core';
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
  isAdmin: boolean;
  userLoggedName: string;
  version = 'Beta version 1.0';
  about = {title: 'PC Serveis', body: 'Dpto. programación\n'};

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService = loginService;
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log('route event = ' + event);
        console.log('event.url.substring(0, 7) = ' + event.url.substring(0, 7));
        if (event.url != '/checkin' && event.url && event.url.substring(0, 7) != '/compan') {
          // Actualiza si está logeado
          console.error('User not logged, please loggin. Redirect to home...');
          this.getLogged();
        }
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
    // console.log(this.userLoggedName);
    }
    */
  }

  private async getLogged() {
    this.isUserLogged = await this.loginService.isUserLogged() as boolean;
    this.userLoggedName = await this.loginService.getEmployeeName() as string;
    this.isAdmin = await this.loginService.isAdmin() as boolean;
    if (this.isUserLogged) {
      this.navigate();
    }
  }
  navigate() {
    this.router.navigateByUrl('dashboard');
  }

  logout() {
    this.loginService.logout();
    this.isUserLogged = false;
    this.userLoggedName = null;
    this.router.navigateByUrl('/');
  }

  showVersion() {

  }

}
