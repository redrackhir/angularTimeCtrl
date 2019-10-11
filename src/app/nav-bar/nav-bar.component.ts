import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from 'src/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title = 'PCsTime';
  isUserLogged: boolean;
  isAdmin: boolean;
  userLoggedName: string;
  userLoggedPermission = '';
  version = 'V1.1';
  // tslint:disable-next-line: max-line-length
  about = {
    title: 'Fichador web',
    body: '<h5>Fichador web</h5>Dpto. programación<br>Más información en <a href=\'http://www.pcserveis.com\'>www.pcserveis.com</a>',
    version: '1.1 release 6'
  };
  collapseClass = 'display: none';

  constructor(private router: Router, private loginService: LoginService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.getLogged();
        this.debug('route event = ' + event);
        this.debug('Company logged? ' + this.loginService.isCompanyLogged());
        this.debug('User logged? ' + this.loginService.isUserLogged());
        this.debug('User isAdmin ' + this.loginService.isAdmin());
        if (!this.loginService.isCompanyLogged() && event.url != '/company-login') {
          this.debug('Company not logged. Redirect to login company...');
          this.router.navigateByUrl('/company-login');
        }

        if (!this.loginService.isUserLogged() && event.url != '/login') {
          this.debug('User not logged, please loggin. Redirect to login user/employee...');
          this.router.navigateByUrl('/login');
        } else if (this.loginService.isUserLogged() && event.url == '/') {
          this.router.navigateByUrl('/dashboard');
        }
        // Permisos paginas protegidas
        if (event.url == '/companies' || event.url == '/employees') {
          if (!this.loginService.isAdmin()) {
            this.debug('You don\'t have access to security area. Redirect to home...');
            this.router.navigateByUrl('/');
          }
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

  }

  navBarButtonOnClick() {
    this.collapseClass = 'display: none';
    this.debug('Closing navbar expanded');
  }

  private async getLogged() {
    this.isUserLogged = await this.loginService.isUserLogged() as boolean;
    this.userLoggedName = await this.loginService.getEmployeeName() as string;
    this.userLoggedPermission = await this.loginService.getPermissionLevel() as string;
    this.isAdmin = await this.loginService.isAdmin() as boolean;
  }

  logout() {
    this.loginService.logout();
    this.isUserLogged = false;
    this.userLoggedName = null;
    this.router.navigateByUrl('/');
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
