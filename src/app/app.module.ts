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
import { FilterPipe } from 'src/_pipes/filter.pipe';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { RptTimerComponent } from './rpt-timer/rpt-timer.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, CheckinComponent, CompaniesComponent,
    EmployeesComponent, MessagesComponent, CompanyDetailComponent, FilterPipe, EmployeeDetailComponent, RptTimerComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
