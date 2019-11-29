import { formatDate, NumberSymbol } from '@angular/common';

export class Employee {
  // campos de la tabla
  codigoEmpleado: string;
  Operario: number;
  codigoEmpresa: number;
  nombreEmpleado: string;
  nifDni: string;
  password: string;
  modificado: Date;
  activo: boolean;
  permisos: string;
  fechaAlta: Date;
  fechaBaja: Date;
  facturar: boolean;
  // campos foraneos
  nombreEmpresa: string;
  anyo: number; // de la vista SQL `vis_empleadosactivosparacobro`
  mes: number;  // de la vista SQL `vis_empleadosactivosparacobro`


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

  canInvoice(): boolean {
    // Calcula si se le puede facturar el mes en curso o no.
    return false;
  }

}
