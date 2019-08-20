import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/_models/employee.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService, Usuario } from 'src/_services';
import { EmployeeService } from 'src/_services/employee.service';
import { FormControl, FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  loggedUser: Usuario;
  empleado: string;
  id: number;
  employee: Employee = new Employee(-1, '', '');
  hasChanges = false;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
              private employeeService: EmployeeService) { }

  async ngOnInit() {
    // get parameter of idEmployee from listCompanies
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    this.getEmployee();

    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }

    console.log(`employee-detail|employee = ${JSON.stringify(this.employee)}`);
    this.empleado = this.loggedUser.nombreEmpleado;
  }

  getEmployee(): void {
    // Leer datos de la empresa
    this.employeeService.getEmployee(this.id).subscribe(response => this.employee = response);
    console.log(`employee-detail|employee = ${JSON.stringify(this.employee)}`);

    /* console.log('result = ' + JSON.stringify(this.employee));
    console.log('hasChanges = ' + this.hasChanges); */
  }

  dataChanged(value: boolean): void {
    this.hasChanges = true;
    this.employee.activo = value;
    console.log('hasChanges = ' + this.hasChanges);
    console.log('employee = ' + JSON.stringify(this.employee));
  }

  saveData(doExit: boolean): void {
    // guardar los cambios
    let response: any;
    console.log('update ' + JSON.stringify(this.employee));
    this.employeeService.updateEmployee(this.employee).subscribe(response => response);
    console.log('response = ' + response);
    if (doExit) {
      this.router.navigateByUrl('/companies');
    }
  }

}
