import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/_models/employee.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { EmployeeService } from 'src/_services/employee.service';
import { FormControl, FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  loggedUser: Usuario;
  empleado: string;
  id: string;
  employee: Employee = new Employee(-1, '', '');
  hasChanges = false;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
              private employeeService: EmployeeService) { }

  async ngOnInit() {
    // get parameter of idEmployee from listCompanies
    this.id = this.route.snapshot.paramMap.get('id');

    this.getEmployee();

    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }

    this.debug(`employee-detail|employee = ${JSON.stringify(this.employee)}`);
    this.empleado = this.loggedUser.nombreEmpleado;
  }

  getEmployee(): void {
    // Leer datos de la empresa
    this.employeeService.getEmployee(this.id).subscribe(response => this.employee = response);
    this.debug(`employee-detail|employee = ${JSON.stringify(this.employee)}`);

    /* this.debug('result = ' + JSON.stringify(this.employee));
    this.debug('hasChanges = ' + this.hasChanges); */
  }

  dataChanged(): void {
    this.hasChanges = true;
    this.debug('Data changed = ' + this.hasChanges);
    this.debug('employee = ' + JSON.stringify(this.employee));
  }

  setPermission(permiso: string) {
    this.employee.permisos = permiso;
    this.dataChanged();
  }

  saveData(doExit: boolean): void {
    // guardar los cambios
    let response: any;
    this.debug('update ' + JSON.stringify(this.employee));
    this.employeeService.updateEmployee(this.employee).subscribe(response => response);
    this.debug('response = ' + response);
    if (doExit) {
      this.router.navigateByUrl('/companies');
    }
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
