import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // PHP_API_SERVER = 'https://82.223.84.132:8443';
  PHP_API_SERVER = 'http://127.0.0.1';
  // private userLogged: User = null;
  private isUserLoggedIn = false;
  private userLogged: User;

  constructor(private http: HttpClient) {
    this.loadUser();
    console.log('login.service: constructor');
    console.log(`....userLogged = ${JSON.stringify(this.userLogged)}`);
   }

  readUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  login(username: string, password: string) {
    // tslint:disable-next-line: prefer-const
    this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      username,
      password
    }).subscribe(resp => {
      console.log('login.service: response = ' + JSON.stringify(resp));
      if (resp['success']) {
        this.isUserLoggedIn = true;
        this.userLogged = resp['user'];
        this.saveUser(this.userLogged);
        console.log('isUserLoggedIn = ' + this.isUserLoggedIn);
        return true;
      } else {
        this.isUserLoggedIn = false;
        this.userLogged = null;
        this.removeUser();
        console.log('isUserLoggedIn = ' + this.isUserLoggedIn);
        return false;
      }
    }, error => {
      console.log('login.service: error = ' + JSON.stringify(error));
      return false;
    });
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUser() {
    this.userLogged = JSON.parse(localStorage.getItem('user'));
    if (this.userLogged.NombreEmpleado != null) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn =false;
    }
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  isUserLogged(): boolean {
    return this.isUserLoggedIn;
    /*
    return new Promise<boolean>(resolve => {
      if (localStorage.getItem('user') != null) {
        console.log('login.service: isUserLogged = ' + true);
        return true;
      } else {
        return false;
      }
    });
    */
  }

  getUserName() {
    console.log(`login.service: userLogged = ${JSON.stringify(this.userLogged)}`);
    return this.userLogged.NombreEmpleado;
    /*
    return new Promise<string>(resolve => {
      if (this.isUserLogged()) {
        const userName = JSON.parse(localStorage.getItem('user'))['NombreEmpleado'];
        console.log('login.service: getUserName = ' + userName);
        return userName;
      } else {
        return null;
      }
    })
    */
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  logout() {
    // remove user from local storage to log user out
    this.removeUser();
    this.isUserLoggedIn = false;
    this.userLogged = null;
  }
}
