import { Component, OnInit } from '@angular/core';
import { Company } from 'src/_models/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { CompanyService } from 'src/_services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  loggedUser: Usuario;
  empleado: string;
  id: number;
  company: Company = new Company('', '');
  hasChanges = false;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
              private companyService: CompanyService) { }

  async ngOnInit() {
    // get parameter of idCompany from listCompanies
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.getCompany();

    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }

    console.log(`company-detail|company = ${JSON.stringify(this.company)}`);
    this.empleado = this.loggedUser.nombreEmpleado;
  }

  getCompany(): void {
    // Leer datos de la empresa
    this.companyService.getCompany(this.id).subscribe(response => this.company = response);
    console.log(`company-detail|company = ${JSON.stringify(this.company)}`);

    /* console.log('result = ' + JSON.stringify(this.company));
    console.log('hasChanges = ' + this.hasChanges); */
  }

  saveData(doExit: boolean): void {
    // guardar los cambios
    let response: any;
    console.log('update ' + JSON.stringify(this.company));
    this.companyService.updateCompany(this.company).subscribe(response => response);
    console.log('response = ' + response);
    if (doExit) {
      this.router.navigateByUrl('/companies');
    }
  }

  toggleActive(): void {
    this.company.activa = !this.company.activa;
  }

}
