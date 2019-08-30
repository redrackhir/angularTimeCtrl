import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';
import { ClockinService } from '../../_services/clock-in.service';
import { Usuario } from 'src/_services';
import { environment } from 'src/environments/environment.prod';
import { formatDate } from '@angular/common';

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
    this.userLogged = this.loginService.getEmployee();
    if (this.userLogged) {
      this.userLoggedName = this.loginService.getEmployeeName();
      this.userLoggedCompany = this.loginService.getCompanyName();
      this.userLoggedPermission = this.loginService.getPermissionLevel();
      this.getLastClockin();
    } else {
      this.router.navigateByUrl('/company-login');
    }
  }

  getLastClockin() {
    this.debug(`this.getLastClockin(${this.userLogged.codigoEmpleado})`);

    this.clockinService.getLastClockin(this.userLogged.codigoEmpleado)
      .subscribe(response => this.userLoggedLastClockin = response, _ => this.debug('Error leyendo datos...')
        , () => this.lastClockin = this.humanize(this.userLoggedLastClockin['last']));
    this.debug('this.userLoggedLastClockin = ' + this.userLoggedLastClockin);
    // this.debug('from dasboard.onInit(): ' + this.userLoggedName);
  }

  humanize(fecha: string): string {
    let date = new Date(fecha);
    let ret = '';
    if (date.getDate() == new Date().getDate()) { ret = `Hoy a las ${date.getHours()}:${date.getMinutes()}`; }
    if (date.getDate() == new Date().getDate() - 1) { ret = `Ayer a las ${date.getHours()}:${date.getMinutes()}`; }
    // tslint:disable-next-line: max-line-length
    if (date.getDate() < new Date().getDate() - 1) { ret = `${formatDate(date, 'dd/MM/yy', 'es')} a las ${date.getHours()}:${date.getMinutes()}`; }
    return ret;
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
