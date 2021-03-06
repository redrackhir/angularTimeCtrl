import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckinComponent } from './checkin/checkin.component';
import { CompaniesComponent } from './companies/companies.component';
import { EmployeesComponent } from './employees/employees.component';
import { MessagesComponent } from './messages/messages.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterByNamePipe } from 'src/_pipes/filterByName.pipe';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RptTimerComponent } from './rpt-timer/rpt-timer.component';
import { FilterByWeekPipe } from 'src/_pipes/filterByWeek.pipe';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EditCheckinsComponent } from './edit-checkins/edit-checkins.component';
import { RptEmployeesActiveComponent } from './rpt-employees-active/rpt-employees-active.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { RptCompaniesInvoiceComponent } from './rpt-companies-invoice/rpt-companies-invoice.component';

// Definir idioma Español
registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, CheckinComponent, CompaniesComponent,
    EmployeesComponent, MessagesComponent, CompanyDetailComponent, FilterByNamePipe, FilterByWeekPipe,
    EmployeeDetailComponent, RptTimerComponent, CompanyLoginComponent, NavBarComponent, EditCheckinsComponent, RptEmployeesActiveComponent, HistoryDetailComponent, RptCompaniesInvoiceComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
