import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, User } from 'src/_services';
import { CheckinService } from 'src/_services/checkin.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  isUserLogged = false;
  userLoggedName = null;
  loggedUser: User;
  private _router: Router;
  private loginService: LoginService;
  checkinService: CheckinService;

  constructor(private router: Router, loginService: LoginService, checkinService: CheckinService) {
    this.loginService = loginService;
    this._router = router;
    this.checkinService = checkinService;
  }


  ngOnInit() {
    this.loggedUser = this.loginService.getUser();
  }

  checkIn(fechahora: string, event: Event) {
    this.checkinService.checkin(this.loggedUser.uid, fechahora);
  }

}
