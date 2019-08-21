import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { CheckinService } from 'src/_services/checkin.service';
import { interval } from 'rxjs';
import { formatDate } from '@angular/common';
import { LocationService } from 'src/_services/location.service';

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
  // tslint:disable-next-line: variable-name
  _locationService: LocationService;
  checkinService: CheckinService;
  public location: any;
  public txtFechahora: Date;
  private secondsCounter = interval(1000);
  private timerSubscribe = this.secondsCounter.subscribe(n => this.refreshTextBoxTime());
  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };
  empresa: string;
  empleado: string;
  private closeIn = -1;
  buttonDisabled: boolean;

  constructor(private router: Router, loginService: LoginService, checkinService: CheckinService, locationService: LocationService) {
    this._loginService = loginService;
    this._locationService = locationService;
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
    // geolocalizacion
    this._locationService.getPosition().then(pos => {
      this.location = pos.lat + ' ' + pos.lng,
        console.log(`Position: ${pos.lat} ${pos.lng}`);
    });
  }

  checkIn(event: Event) {
    event.preventDefault();
    // console.log(`checkin.component: checkIn() => this.loggedUser = ${JSON.stringify(this.loggedUser)}`);
    const fechahora: string = formatDate(Date.now(), 'yyyy/MM/dd HH:mm:ss', 'en-US');
    this.checkinService.checkin(this.loggedUser.codigoEmpleado, fechahora, this.location).subscribe(resp => {
      // console.log('checkin.service: response = ' + JSON.stringify(resp));
      // tslint:disable-next-line: no-string-literal
      if (resp['success']) {
        // console.log('on success = true: transacc');
        this.closeIn = 2;
        this.alert = { class: 'alert alert-success', msg: 'Fichada guardada correctamente', show: true };
        this.buttonDisabled = true;
      } else {
        // console.error(`Error PHP/SQL: ${resp['message']}`);
        // tslint:disable-next-line: no-string-literal
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
        this._router.navigateByUrl('/dashboard');
      }
    }
  }

}
