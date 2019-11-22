import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { EmployeeService } from 'src/_services/employee.service';
import { CompanyService } from 'src/_services/company.service';
import { Employee } from 'src/_models/employee.model';
import { Company } from 'src/_models/company.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public searchText = '';
  loggedUser: Usuario;
  empleado: any;
  employees: Employee[];
  companies: Company[];
  filteredEmployees: Employee[];

  constructor(private router: Router, private loginService: LoginService, private employeeService: EmployeeService,
              private companyService: CompanyService) {
    this.router.events.forEach((event) => {
      // this.debug('route event...' + event);
      if (event instanceof NavigationEnd && event.url == '/employees') {
        this.ngOnInit();
        // this.debug('reloading data...' + event);
      }
    });
  }

  async ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }
    // this.checkinService.setLastTransacc(false);
    // this.debug(`this.loggedUser = ${JSON.stringify(this.loggedUser)}`);

    // this.empresa = 'Empresa ' + this.loggedUser.nombreEmpresa;
    this.empleado = this.loggedUser.nombreEmpleado;
    this.getEmployees();
    this.getCompanies();
    // this.debug('response 3: ' + JSON.stringify(this.data));
  }

  getEmployees(): void {
    // Leer datos empresas
    this.employeeService.getEmployeesList().subscribe(response => this.employees = response);
    this.employeeService.getEmployeesList().subscribe(response => this.filteredEmployees = response);
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

  filterByCompany(codEmpresa: number) {
    this.filteredEmployees = this.employees.filter(employee => employee.codigoEmpresa === codEmpresa);
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
    this.getEmployees();
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
