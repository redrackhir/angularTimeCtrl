import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpt-timer',
  templateUrl: './rpt-timer.component.html',
  styleUrls: ['./rpt-timer.component.scss']
})
export class RptTimerComponent implements OnInit {
  companyService: any;
  registries: any[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getRegistries();
  }

  getRegistries(): void {
    // Leer datos resumen horas
    this.companyService.getCompaniesList().subscribe(response => this.registries = response);
  }
}

}
