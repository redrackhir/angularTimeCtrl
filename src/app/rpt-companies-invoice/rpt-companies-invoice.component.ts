import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/_services/company.service';

@Component({
  selector: 'app-rpt-companies-invoice',
  templateUrl: './rpt-companies-invoice.component.html',
  styleUrls: ['./rpt-companies-invoice.component.scss']
})
export class RptCompaniesInvoiceComponent implements OnInit {

  report: any[];
  today: Date;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getReport();
    this.today = new Date();
  }

  getReport(): void {
    // Leer datos del informe
    this.companyService.getInvoicingReport().subscribe(response => {this.report = response; });
  }

}
