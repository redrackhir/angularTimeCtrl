import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isUserLogged = false;
  userLogged = null;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.userLogged = localStorage.getItem('user');
    if (!this.userLogged) {
      this.isUserLogged = false;
    } else {
      this.isUserLogged = true;
    }
    console.log('from dasboard.onInit(): ' + this.userLogged);
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLogged = false;
    this.userLogged = null;
    // this.router.navigateByUrl('');
    this.router.navigateByUrl('');
  }



}
