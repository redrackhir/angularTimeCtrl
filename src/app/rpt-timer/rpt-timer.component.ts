import { Component, OnInit } from '@angular/core';
import { ClockinService } from 'src/_services/clock-in.service';
import { LoginService } from 'src/_services';
import { Clockin } from 'src/_models/clockin.model';
import { forEach } from '@angular/router/src/utils/collection';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rpt-timer',
  templateUrl: './rpt-timer.component.html',
  styleUrls: ['./rpt-timer.component.scss']
})
export class RptTimerComponent implements OnInit {
  clockins: Clockin[] = [];
  filterWeek = 0;
  filterMonth = 0;
  filterYear = 0;
  filterText = '';
  private idEmpresa: number;
  private idEmpleado: number;

  constructor(private loginService: LoginService, private router: Router, private clokinService: ClockinService) { }

  ngOnInit() {
    if (!this.loginService.isUserLogged) { this.router.navigateByUrl('/'); }
    this.idEmpresa = this.loginService.getEmployee().codigoEmpresa;
    this.idEmpleado = this.loginService.getEmployee().codigoEmpleado;
    this.filterWeek = this.getWeekNumber(new Date()) - 1;
    this.filterText = 'Semana en curso';
    this.getClockins();
  }

  getClockins(): void {
    // Leer datos resumen horas
    // tslint:disable-next-line: max-line-length
    this.clokinService.getClockinsList(this.idEmpresa, this.idEmpleado, this.filterWeek, this.filterMonth, this.filterYear)
      .subscribe(response => this.clockins = response);
  }

  filterByCurrentWeek(): void {
    const d = new Date();
    this.filterWeek = this.getWeekNumber(d) - 1;
    this.filterMonth = 0;
    this.filterYear = 0;
    this.filterText = 'Semana en curso';
    this.getClockins();
  }

  filterByCurrentMonth(): void {
    this.filterMonth = new Date().getMonth() + 1;
    this.filterYear = 0;
    this.filterWeek = 0;
    this.filterText = 'Mes en curso';
    this.getClockins();
  }

  filterByCurrentYear(): void {
    this.filterYear = new Date().getFullYear();
    this.filterMonth = 0;
    this.filterWeek = 0;
    this.filterText = 'Año en curso';
    this.getClockins();
  }

  getSumaHoras(): number {
    let sum = 0;
    // tslint:disable-next-line: prefer-const
    if (!this.clockins) { return 0; }
    for (let clockin of this.clockins) {
      sum += parseFloat(clockin.horas.toString());
    }
    return sum;
  }

  getDayOfWeek(d: string): string {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dat = new Date(d);
    const diasem = dat.getDay();
    return dias[diasem].substr(0, 3);
  }

  private getWeekNumber(d: Date): number {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    let yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}


