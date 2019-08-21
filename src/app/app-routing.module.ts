import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RptTimerComponent } from './rpt-timer/rpt-timer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: AppComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company', component: CompanyDetailComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'rpt-timer', component: RptTimerComponent },
  { path: '', component: AppComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
