import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Empleado } from 'src/_services';
import { CheckinService } from 'src/_services/checkin.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})

export class CheckinComponent implements OnInit {

  isUserLogged = false;
  userLoggedName = null;
  loggedUser: Empleado;
  private _router: Router;
  private loginService: LoginService;
  checkinService: CheckinService;
  fechahora: Date;

  constructor(private router: Router, loginService: LoginService, checkinService: CheckinService, fechahora: string) {
    this.loginService = loginService;
    this._router = router;
    this.checkinService = checkinService;
  }


  ngOnInit() {
    this.loggedUser = this.loginService.getUser();
    const secondsCounter = interval(1000);
    secondsCounter.subscribe(n => this.refreshTextBoxTime());
  }

  checkIn(fechahora: string, event: Event) {
    this.checkinService.checkin(this.loggedUser.codigoEmpleado, fechahora);
  }

  refreshTextBoxTime() {
    this.fechahora = new Date();
  }

}
