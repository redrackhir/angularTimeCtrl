import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { EmployeeService } from 'src/_services/employee.service';
import { CompanyService } from 'src/_services/company.service';
import { Employee } from 'src/_models/employee.model';
import { Company } from 'src/_models/company.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  loggedUser: Usuario;
  empleado: any;
  employees: Employee[];
  companies: Company[];

  constructor(private router: Router, private loginService: LoginService, private employeeService: EmployeeService
    , private companyService: CompanyService) {
    this.router.events.forEach((event) => {
      // console.log('route event...' + event);
      if (event instanceof NavigationEnd && event.url == '/employees') {
        this.ngOnInit();
        // console.log('reloading data...' + event);
      }
    });
  }

  async ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }
    // this.checkinService.setLastTransacc(false);
    // console.log(`this.loggedUser = ${JSON.stringify(this.loggedUser)}`);

    // this.empresa = 'Empresa ' + this.loggedUser.nombreEmpresa;
    this.empleado = this.loggedUser.nombreEmpleado;
    this.getEmployees();
    this.getCompanies();
    // console.log('response 3: ' + JSON.stringify(this.data));
  }

  getEmployees(): void {
    // Leer datos empresas
    this.employeeService.getEmployeesList().subscribe(response => this.employees = response);
  }

  getCompanies(): void {
    // Leer datos empresas
    this.companyService.getCompaniesList().subscribe(response => this.companies = response);
  }

  employeeDetail(id: number) {
    // Ir a la edición de empresa
    this.router.navigateByUrl('/employee' + id); // :id=' + id);
  }

  add(codEmpresa: number, nombreEmpleado: string, nifDni: string): void {
    nombreEmpleado = nombreEmpleado.trim();
    nifDni = nifDni.trim();

    if (!nombreEmpleado || !nifDni) { return; }

    const employee = new Employee(codEmpresa, nombreEmpleado, nifDni);
    employee.nombreEmpresa = "¡Nuevo!";

    console.log('Employee = ' + JSON.stringify(employee));

    this.employeeService.addEmployee(employee)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(employee => {
        this.employees.push(employee);
        console.log('new employee added: ' + JSON.stringify(employee));
      });
  }

  public toggleActive(id: number) {
    const employee = this.employees[this.arrayObjectIndexOf(this.employees, id, 'codigoEmpleado')];
    if (employee.activo == 0) { employee.activo = -1 } else { employee.activo = 0 }
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      // console.log('myArray[i][property] = ' + myArray[i][property]);
      // tslint:disable-next-line: triple-equals
      if (myArray[i][property] == searchTerm) { return i; }
    }
  }

}
