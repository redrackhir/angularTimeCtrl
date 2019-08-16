import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { CheckinService } from 'src/_services/checkin.service';
import { interval } from 'rxjs';
import { formatDate } from '@angular/common';
import { Button } from 'protractor';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})

export class CheckinComponent implements OnInit {

  isUserLogged = false;
  userLoggedName = null;
  loggedUser: Usuario;
  // tslint:disable-next-line: variable-name
  private _router: Router;
  // tslint:disable-next-line: variable-name
  private _loginService: LoginService;
  checkinService: CheckinService;
  public txtFechahora: Date;
  private secondsCounter = interval(1000);
  private timerSubscribe = this.secondsCounter.subscribe(n => this.refreshTextBoxTime());
  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };
  empresa: string;
  empleado: string;
  private closeIn = -1;
  buttonDisabled: boolean;

  constructor(private router: Router, loginService: LoginService, checkinService: CheckinService) {
    this._loginService = loginService;
    this._router = router;
    this.checkinService = checkinService;
    this.loggedUser = this._loginService.getEmployee();
  }


  ngOnInit() {
    // this.loggedUser = this._loginService.getEmployee();
    if (this.loggedUser == null) { this._router.navigateByUrl('/'); }
    this.checkinService.setLastTransacc(false);
    // console.log(`checkin.component: onInit() => this.loggedUser = ${JSON.stringify(this.loggedUser)}`);

    this.empresa = 'Empresa ' + this.loggedUser.nombreEmpresa;
    this.empleado = this.loggedUser.nombreEmpleado;
  }

  checkIn(event: Event) {
    event.preventDefault();
    // console.log(`checkin.component: checkIn() => this.loggedUser = ${JSON.stringify(this.loggedUser)}`);
    const fechahora: string = formatDate(Date.now(), 'yyyy/MM/dd HH:mm:ss', 'en-US');
    this.checkinService.checkin(this.loggedUser.codigoEmpleado, fechahora).subscribe(resp => {
      // console.log('checkin.service: response = ' + JSON.stringify(resp));
      if (resp['success']) {
        // console.log('on success = true: transacc');
        this.closeIn = 2;
        this.alert = { class: 'alert alert-success', msg: 'Fichada guardada correctamente', show: true };
        this.buttonDisabled = true;
      } else {
        // console.error(`Error PHP/SQL: ${resp['message']}`);
        this.alert = { class: 'alert alert-warning', msg: 'Excepción: ' + resp['message'], show: true };
        return false;
      }
    }, error => {
      // console.log('checkin.service: error = ' + JSON.stringify(error));
      this.alert = { class: 'alert alert-danger', msg: 'Error: ' + JSON.stringify(error.name), show: true };
      return false;
    });
  }

  refreshTextBoxTime() {
    this.txtFechahora = new Date();
    // console.log(`checkin.component: closeIn = ${this.closeIn}`);
    if (this.closeIn > -1) {
      this.closeIn--;
      if (this.closeIn < 0) {
        this.timerSubscribe.unsubscribe();
        this._router.navigateByUrl('');
      }
    }
  }

}
