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

  constructor(private http: HttpClient) {}

  readUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.PHP_API_SERVER}/api/readUser.php`, {
      username,
      password
    });
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.PHP_API_SERVER}/api/update.php`, user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
