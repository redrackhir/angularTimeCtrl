import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
  currentEmployee: Employee;
  empleado: string;
  public employee: Employee;
  employees: Employee[];
  companies: Company[];
  selectedCompany: Company;
  filteredEmployees: Employee[];
  companyId: number;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
    private employeeService: EmployeeService, private companyService: CompanyService) {
  }

  async ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }
    // this.checkinService.setLastTransacc(false);
    // this.debug(`this.loggedUser = ${JSON.stringify(this.loggedUser)}`);
    // get parameters from url name
    this.companyId = parseInt(this.route.snapshot.paramMap.get('compId'), 10);
    this.debug(`compId = ${this.companyId}`);
    this.empleado = this.loggedUser.nombreEmpleado;
    this.getEmployees();
    this.getCompanies();
    // this.filterByCompany(this.selectedCompany.codigoEmpresa || 0);
    // this.debug('response 3: ' + JSON.stringify(this.data));
  }

  getEmployees(): void {
    // Leer datos empresas
    // tslint:disable-next-line: max-line-length
    // this.employeeService.getEmployeesList().subscribe(response => this.filteredEmployees = response, error => this.debug(`error ${error}`));
    this.employeeService.getEmployeesList().subscribe(response => {
      this.employees = response,
        this.filterByCompany(this.companyId);
    }
    );
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

  filterByCompany(codEmpresa: number) {
    if (codEmpresa == 0) { return; }
    this.debug(`filtering by: ${codEmpresa}`);
    this.debug(`employees: ${this.employees.length}`);
    this.filteredEmployees = this.employees.filter(employee => employee.codigoEmpresa == codEmpresa);
  }

  public toggleActive(employee: Employee) {
    // const employee = this.employees[this.arrayObjectIndexOf(this.employees, id, 'codigoEmpleado')];
    employee.activo = !employee.activo;
    this.employeeService.updateEmployee(employee).subscribe();
  }

  public toggleFacturar(employee: Employee) {
    // const employee = this.employees[this.arrayObjectIndexOf(this.employees, id, 'codigoEmpleado')];
    employee.facturar = !employee.facturar;
    this.employeeService.updateEmployee(employee).subscribe();
  }

  public deleteEmployee(employee: Employee) {
    // TODO: Ventana modal con confirmación de eliminado
    this.employeeService.deleteEmployee(employee.codigoEmpleado, employee.codigoEmpresa).subscribe();
    this.getEmployees();
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
