import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isUserLogged = false;
  userLoggedName = null;
  private _router: Router;
  loginService: LoginService;

  constructor(private router: Router, loginService: LoginService) {
    this.loginService = loginService;
    this._router = router;
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
    if (this.isUserLogged) {
      this.userLoggedName = this.loginService.getUserName();
      console.log('this.userLoggedName = ' + this.userLoggedName);
    }
    console.log('from dasboard.onInit(): ' + this.userLoggedName);
  }

  logout() {
    this.loginService.logout();
    this._router.navigateByUrl('');
    /*
    localStorage.removeItem('user');
    this.isUserLogged = false;
    this.userLoggedName = null;
    // this.router.navigateByUrl('');
    */
  }



}
