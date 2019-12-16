import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RptTimerComponent } from './rpt-timer/rpt-timer.component';
import { EditCheckinsComponent } from './edit-checkins/edit-checkins.component';
import { RptEmployeesActiveComponent } from './rpt-employees-active/rpt-employees-active.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { RptCompaniesInvoiceComponent } from './rpt-companies-invoice/rpt-companies-invoice.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'company-login', component: CompanyLoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: AppComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company', component: CompanyDetailComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'employees/:compId', component: EmployeesComponent },
  { path: 'employee/:compId/:emplId', component: EmployeeDetailComponent },
  { path: 'history/:compId/:empId', component: HistoryDetailComponent },
  { path: 'rpt-timer', component: RptTimerComponent },
  { path: 'rpt-employees-active', component: RptEmployeesActiveComponent },
  { path: 'rpt-companies-invoice', component: RptCompaniesInvoiceComponent },
  { path: 'edit-checkins', component: EditCheckinsComponent },
  { path: '', component: AppComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
