import { Component, OnInit } from '@angular/core';
import { Company } from 'src/_models/company.model';
import { LoginService } from 'src/_services';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/_services/message.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {

  loading = false;
  companyLogged: Company;
  isCompanyLoggedIn = false;
  // tslint:disable-next-line: variable-name

  alert: any = { class: 'alert alert-primary', msg: 'nothing', show: false };

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) {

  }

  ngOnInit() {
    // this.debug('login component (onInit): this._loginService.isCompanyLogged() = ' + this._loginService.isCompanyLogged());
    this.loading = false;
    this.companyLogged = this.loginService.getCompany();
    if (this.companyLogged) { this.router.navigateByUrl('/login'); }
  }

  logIn(uid: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    this.loading = true;
    // Login company/company
    this.loginService.loginCompany(uid, password).subscribe(resp => {
      // this.debug('login.comp: response = ' + JSON.stringify(resp));
      if (resp != null) {
        // tslint:disable-next-line: no-string-literal
        if (resp['success'] === true) {
          this.isCompanyLoggedIn = true;
          // tslint:disable-next-line: no-string-literal
          this.companyLogged = resp['company'];
          // tslint:disable-next-line: no-string-literal
          // this.companyLogged.codigoEmpresa = resp['codigoEmpresa'];
          this.saveCompany(this.companyLogged);
          this.debug(`company & isCompanyLoggedIn = ${JSON.stringify(this.companyLogged)} // ${this.isCompanyLoggedIn}`);
          this.router.navigateByUrl('/login');
          this.loading = false;
        } else {
          // tslint:disable-next-line: max-line-length
          this.log('Código empresa o contraseña incorrectos', 'warning');
          this.loading = false;
        }
      } else {
        this.isCompanyLoggedIn = false;
        this.companyLogged = null;
        // this.debug('no response from PHP');
        this.removeCompany();
        this.loading = false;
      }
    }, error => {
      // this.debug('login.comp: error = ' + JSON.stringify(error));
      this.loading = false;
    });
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
    // this.debug('navigating to /dashboard...');
  }

  saveCompany(empresa: Company) {
    const values = [empresa.codigoEmpresa, empresa.nombreEmpresa];
    localStorage.setItem('company', JSON.stringify(empresa));
    // this.debug('login.service: company saved on local');
  }

  private removeCompany() {
    localStorage.removeItem('company');
  }

  logout() {
    this.loginService.logout();
    this.removeCompany();
    this.isCompanyLoggedIn = false;
    this.companyLogged = null;
    this.navigate();
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

  /** Log a message with the MessageService */
  private log(message: string, alertType: string) {
    this.messageService.add(message, alertType);
  }

}

