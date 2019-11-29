import { Component, OnInit } from '@angular/core';
import { Usuario, LoginService } from 'src/_services';
import { Employee } from 'src/_models/employee.model';
import { Company } from 'src/_models/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from 'src/_services/employee.service';
import { Movement } from 'src/_models/movement.model';
import { CompanyService } from 'src/_services/company.service';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  public searchText = '';
  loggedUser: Usuario;
  currentEmployee: Employee;
  empleado: string;
  histories: Movement[];
  employeeId: string;
  companyId: number;
  companies: Company[];
  selectedCompany: Company;

  constructor(private router: Router, private loginService: LoginService,
              private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.histories = [];
  }

  async ngOnInit() {
    this.loggedUser = this.loginService.getEmployee();
    if (this.loggedUser === undefined) { this.router.navigateByUrl('/'); return; }
    // this.checkinService.setLastTransacc(false);
    // this.debug(`this.loggedUser = ${JSON.stringify(this.loggedUser)}`);
    // this.empleado = this.loggedUser.nombreEmpleado;
    // Cogemos los parametros de la propia cadena url
    this.companyId = parseInt(this.route.snapshot.paramMap.get('compId'), 10);
    this.employeeId = this.route.snapshot.paramMap.get('empId');
    this.getHistories();
  }

  getHistories(): void {
    // Leer datos empresas
    this.debug(`getMovsList of ${this.companyId} & ${this.employeeId}`);
    this.employeeService.getMovementsList(this.companyId, this.employeeId).subscribe(response => this.histories = response);
    // this.historiesService.getHistoriesList().subscribe(response => this.filteredHistories = response);
  }

  employeeDetail(id: number) {
    // Ir a la edición de empresa
    this.router.navigateByUrl('/employee' + id); // :id=' + id);
  }

  debug(msg: string) {
    if (!environment.production) {
      console.log(msg);
    }
  }

}
