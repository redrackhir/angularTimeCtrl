import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';
import { ClockinService } from '../../_services/clock-in.service';
import { Usuario } from 'src/_services';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isUserLogged = false;
  userLogged: Usuario;
  userLoggedName = '';
  userLoggedCompany = '';
  userLoggedPermission = '';
  userLoggedLastClockin: any;
  lastClockin = '';
  // private _router: Router;
  // loginService: LoginService;

  constructor(private router: Router, private loginService: LoginService, private clockinService: ClockinService) {
    this.userLogged = loginService.getEmployee();
    // this.loginService = loginService;
    // this._router = router;
  }

  ngOnInit() {
    /*
    this.userLogged = localStorage.getItem('user');
    if (!this.userLogged) {
      this.isUserLogged = false;
    } else {
      this.isUserLogged = true;
    }
    */
    this.isUserLogged = this.loginService.isUserLogged();
    if (this.userLogged) {
      this.userLoggedName = this.loginService.getEmployeeName();
      this.userLoggedCompany = this.loginService.getCompanyName();
      this.userLoggedPermission = this.loginService.getPermissionLevel();
    }
    this.debug(`this.getLastClockin(${this.userLogged.codigoEmpleado})`);
    this.clockinService.getLastClockin(this.userLogged.codigoEmpleado)
                      .subscribe(response => this.userLoggedLastClockin = response, _ => this.debug('Error leyendo datos...')
                      , () => this.lastClockin = this.userLoggedLastClockin['last']);
    this.debug('this.userLoggedLastClockin = ' + this.userLoggedLastClockin);
    // this.debug('from dasboard.onInit(): ' + this.userLoggedName);
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
    /*
    localStorage.removeItem('user');
    this.isUserLogged = false;
    this.userLoggedName = null;
    // this.router.navigateByUrl('');
    */
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
