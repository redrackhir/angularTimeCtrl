import { Injectable } from '@angular/core';
import { Empleado } from '../_models/user.model';

@Injectable()
export class UserService {
  private isUserLoggedIn;
  public usserLogged: Empleado;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: Empleado) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
