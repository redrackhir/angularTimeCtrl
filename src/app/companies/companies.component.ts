import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/_services/company.service';
import { Company } from 'src/_models/company.model';
import { LoginService, Usuario } from 'src/_services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})

export class CompaniesComponent implements OnInit {

  loggedUser: Usuario;
  empleado: string;
  isUserLogged = false;
  userLoggedName = null;
  companies: Company[];
  currentCompany: Company = new Company('', '');

  constructor(private router: Router, private loginService: LoginService, private companyService: CompanyService) {
    this.router.events.forEach((event) => {
      // console.log('route event...' + event);
      if (event instanceof NavigationEnd && event.url == '/companies') {
        this.ngOnInit();
        // console.log('reloading data...' + event);
      }
    });
  }

  async ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }
    // this.checkinService.setLastTransacc(false);
    // console.log(`this.loggedUser = ${JSON.stringify(this.loggedUser)}`);

    // this.empresa = 'Empresa ' + this.loggedUser.nombreEmpresa;
    this.empleado = this.loggedUser.nombreEmpleado;
    this.getCompanies();
    // console.log('response 3: ' + JSON.stringify(this.data));
  }

  getCompanies(): void {
    // Leer datos empresas
    this.companyService.getCompaniesList().subscribe(response => this.companies = response);
  }

  companyDetail(id: number) {
    // Ir a la edición de empresa
    this.router.navigateByUrl('/company' + id); // :id=' + id);
  }

  add(nombreEmpresa: string, cifDni: string): void {
    nombreEmpresa = nombreEmpresa.trim();
    cifDni = cifDni.trim();

    if (!nombreEmpresa || !cifDni) { return; }

    const company = new Company(nombreEmpresa, cifDni);

    console.log('Company = ' + JSON.stringify(company));

    this.companyService.addCompany(company)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(company => {
        this.companies.push(company);
      });
  }

  public setCurrentCompany(company: Company) {
    this.currentCompany = company;
    console.log(`Current company = ${JSON.stringify(this.currentCompany)}`);
  }

  public toggleActive(id: number): void {
    const company = this.companies[this.arrayObjectIndexOf(this.companies, id, 'codigoEmpresa')];
    company.activa = !company.activa;
    this.companyService.updateCompany(company).subscribe();
  }

  public deleteCompany() {
    // TODO: Ventana modal con confirmación de eliminado
    const company = this.currentCompany;
    console.log(`Delete company = ${JSON.stringify(company)}`);
    this.companyService.deleteCompany(company).subscribe();
    this.getCompanies();
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      // console.log('myArray[i][property] = ' + myArray[i][property]);
      // tslint:disable-next-line: triple-equals
      if (myArray[i][property] == searchTerm) { return i; }
    }
  }

}
