import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Checkin } from 'src/_models/checkin.model';
import { CheckinService } from 'src/_services/checkin.service';
import { environment } from 'src/environments/environment';
import { CompanyService } from 'src/_services/company.service';
import { Company } from 'src/_models/company.model';

@Component({
  selector: 'app-edit-checkins',
  templateUrl: './edit-checkins.component.html',
  styleUrls: ['./edit-checkins.component.scss']
})

export class EditCheckinsComponent implements OnInit {

  checkins: Checkin[];
  filteredCheckins: Checkin[];
  companies: Company[];
  selectedCompany: Company;
  companyId: number;
  employeeId: string;
  dateAndTime: string;
  loading = false;

  constructor(private router: Router, private checkinService: CheckinService, private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
    // this.getCheckins();
  }

  // getCheckins(): void {
  //   // Leer datos empresas
  //   this.loading = true;
  //   this.checkinService.readFilteredCheckins().subscribe(response => {
  //     this.checkins = response,
  //       this.loading = false;
  //   });
  // }

  applyFilter(): void {
    this.loading = true;
    this.checkinService.readFilteredCheckins(this.selectedCompany.codigoEmpresa, this.employeeId, this.dateAndTime)
      .subscribe(response => {
        this.checkins = response, this.loading = false;
      });
  }

  getCompanies(): void {
    // Leer datos empresas
    this.loading = true;
    this.companyService.getCompaniesList().subscribe(response => {
      this.companies = response, this.loading = false, this.selectedCompany = response[0]
      , this.debug(`selectedCompany = ` + JSON.stringify(this.selectedCompany));
    });
  }

  companyIdChanged_Event(idCompany: number) {
    this.selectedCompany = this.getCompanyById(idCompany);
    this.debug(`selectedCompany = ` + JSON.stringify(this.selectedCompany));
  }

  getCompanyById(id: number) {
    return this.companies.find(co => co.codigoEmpresa === id);
  }

  employeeIdChanged_Event(employeeId: string) {
    this.employeeId = employeeId;
  }

  dateAndTimeChanged_Event(dateAndTime: string) {
    this.dateAndTime = dateAndTime;
  }

  add(codEmpresa: number, nombreEmpleado: string, nifDni: string): void {
    nombreEmpleado = nombreEmpleado.trim();
    nifDni = nifDni.trim();

    if (!nombreEmpleado || !nifDni) { return; }
  }

  updateCheckin(checkin: Checkin): void {
    this.debug(`checkin = ${JSON.stringify(checkin)}`);
    this.checkinService.updateCheckin(checkin);
  }

  public deleteCheckin(checkin: Checkin) {
    // TODO: Ventana modal con confirmación de eliminado
    this.checkinService.deleteCheckin(checkin.idFichada).subscribe();
    // this.getCheckins();
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      // this.debug('myArray[i][property] = ' + myArray[i][property]);
      // tslint:disable-next-line: triple-equals
      if (myArray[i][property] == searchTerm) { return i; }
    }
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
