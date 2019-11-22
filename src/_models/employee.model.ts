import { formatDate, NumberSymbol } from '@angular/common';

export class Employee {
  codigoEmpresa: number;
  nombreEmpresa: string;
  codigoEmpleado: string;
  Operario: number;
  nombreEmpleado: string;
  nifDni: string;
  fechaAlta: Date;
  activo: boolean;
  permisos: string;

  constructor(codEmpresa: number, nombre: string, nif: string) {
    this.codigoEmpresa = codEmpresa;
    this.codigoEmpleado = '-1';
    this.Operario = 0;
    this.nombreEmpleado = nombre;
    this.nifDni = nif;
    this.fechaAlta = new Date();
    this.activo = true;
    this.permisos = 'Usuario';
  }

}
