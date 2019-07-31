import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CompanyService } from 'src/_services/company.service';
import { Company } from 'src/_models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})

export class CompaniesComponent implements OnInit {

  isUserLogged = false;
  userLoggedName = null;
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  async ngOnInit() {
    /*
    this.isUserLogged = this.loginService.isUserLogged();
    if (this.isUserLogged) {
      this.userLoggedName = this.loginService.getEmployeeName();
    }
    */
    this.getCompanies();
    // console.log('response 3: ' + JSON.stringify(this.data));
  }

  getCompanies(): void {
    // Leer datos empresas
    this.companyService.getCompaniesList().subscribe(response => this.companies = response);
    /*
    this.companyService.getCompaniesList().subscribe(data => { // this.data = data);
      console.log('response 1: ' + JSON.stringify(data));
      this.companies = data;
      console.log('data: ' + JSON.stringify(this.companies));
    });
    */
    // console.log('companies = ' + JSON.stringify(this.data));
  }

  add(nombreEmpresa: string, cifDni: string): void {
    nombreEmpresa = nombreEmpresa.trim();
    cifDni = cifDni.trim();

    if (!nombreEmpresa || !cifDni) { return; }

    let company = new Company(nombreEmpresa, cifDni);

    console.log('Company = ' + JSON.stringify(company));

    this.companyService.addCompany(company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }

  public toggleActive(id: number) {
    let company = this.companies[this.arrayObjectIndexOf(this.companies, id, 'codigoEmpresa')];
    company.Activa = !company.Activa;
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
        // console.log('myArray[i][property] = ' + myArray[i][property]);
        if (myArray[i][property] == searchTerm) { return i; }
    }
  }

}
