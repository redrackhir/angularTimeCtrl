import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/_models/employee.model';
import { environment } from 'src/environments/environment';
import { Usuario, LoginService } from 'src/_services';
import { Company } from 'src/_models/company.model';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/_services/employee.service';
import { CompanyService } from 'src/_services/company.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-rpt-employees-active',
  templateUrl: './rpt-employees-active.component.html',
  styleUrls: ['./rpt-employees-active.component.scss']
})
export class RptEmployeesActiveComponent implements OnInit {

  public searchText = '';
  loggedUser: Usuario;
  currentEmployee: Employee;
  empleado: any;
  employees: Employee[];
  filteredEmployees: Employee[];
  companies: Company[];
  selectedCompany: Company;
  public totalRegistros = 0;
  anyo = new Date().getFullYear();
  mes = new Date().getMonth() + 1;
  codEmpresa = 0;

  constructor(private loginService: LoginService, private employeeService: EmployeeService,
              private companyService: CompanyService, private router: Router) {
  }

  ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    this.debug(`mes = ${this.mes}`);
    this.empleado = this.loggedUser.nombreEmpleado;
    this.getCompanies();
    this.getEmployeesActive();
  }

  getEmployeesActive(): void {
    // Leer datos empresas
    this.employeeService.getEmployeesListActive().subscribe(response => {
      this.employees = response;
      // this.filterByCompany(0);
    });
    // this.employeeService.getEmployeesList().subscribe(response => this.filteredEmployees = response);
  }

  getCompanies(): void {
    // Leer datos empresas
    this.companyService.getCompaniesList().subscribe(response => this.companies = response);
  }

  employeeDetail(id: number) {
    // Ir a la edición de empresa
    this.router.navigateByUrl('/employee' + id); // :id=' + id);
  }

  getBadgeType(permiso: string): string {
    let badType = 'light';
    if (permiso.toLowerCase().includes('usuario')) { badType = 'secondary'; }
    if (permiso.toLowerCase().includes('avanzado')) { badType = 'dark'; }
    if (permiso.toLowerCase().includes('admin')) { badType = 'warning'; }
    // this.debug(`permiso: ${permiso} retVal = ${badType}`);
    return 'badge badge-pill badge-' + badType;
  }

  setCompanyFilter(codEmpresa: number) {this.codEmpresa = codEmpresa; }
  setYearFilter(anyo: number) {this.anyo = anyo; }
  setMonthFilter(mes: number) {this.mes = mes; }

  applyFilters(): void {
    this.debug(`aplicando filtros: ${this.codEmpresa} + ${this.anyo} + ${this.mes}`);
    this.filterByCompany();
    // this.filterByYear();
    // this.filterByMonth();
  }

  filterByCompany() {
    // this.idEmpresaFiltro = codEmpresa;
    if (this.codEmpresa > 0) {
      // tslint:disable-next-line: no-shadowed-variable
      this.filteredEmployees = this.employees.filter(employee => employee.codigoEmpresa === this.codEmpresa);
      this.totalRegistros = this.filteredEmployees.length;
    } else {
      this.filteredEmployees = this.employees;
      this.totalRegistros = this.filteredEmployees.length;
    }
  }

  filterByYear() {
    this.filteredEmployees = this.filteredEmployees.filter(employee => employee.anyo == this.anyo);
    this.totalRegistros = this.filteredEmployees.length;
  }

  filterByMonth() {
    this.filteredEmployees = this.filteredEmployees.filter(employee => employee.mes == this.mes);
    this.totalRegistros = this.filteredEmployees.length;
  }

  regs2Invoice(): number {
    return this.filteredEmployees.filter(employee => employee.facturar == true).length;
  }

  add(codEmpresa: number, nombreEmpleado: string, nifDni: string): void {
    nombreEmpleado = nombreEmpleado.trim();
    nifDni = nifDni.trim();

    if (!nombreEmpleado || !nifDni) { return; }

    const employee = new Employee(codEmpresa, nombreEmpleado, nifDni);
    employee.nombreEmpresa = '¡Nuevo!';

    this.debug('Employee = ' + JSON.stringify(employee));

    this.employeeService.addEmployee(employee)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(employee => {
        this.employees.push(employee);
        this.debug('new employee added: ' + JSON.stringify(employee));
      });
  }

  public toggleActive(employee: Employee) {
    // const employee = this.employees[this.arrayObjectIndexOf(this.employees, id, 'codigoEmpleado')];
    employee.activo = !employee.activo;
    this.employeeService.updateEmployee(employee).subscribe();
  }

  public deleteEmployee(employee: Employee) {
    // TODO: Ventana modal con confirmación de eliminado
    this.employeeService.deleteEmployee(employee.codigoEmpleado, employee.codigoEmpresa).subscribe();
    this.getEmployeesActive();
  }

  arrayObjectIndexOf(myArray, searchTerm, property) {
    for (let i = 0, len = myArray.length; i < len; i++) {
      // this.debug('myArray[i][property] = ' + myArray[i][property]);
      // tslint:disable-next-line: triple-equals
      if (myArray[i][property] == searchTerm) { return i; }
    }
  }

  public setCurrentEmployee(employee: Employee) {
    this.currentEmployee = employee;
    this.debug(`Current employee = ${JSON.stringify(this.currentEmployee)}`);
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
