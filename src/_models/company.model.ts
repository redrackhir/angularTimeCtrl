import { formatDate } from '@angular/common';

export class Company {
  codigoEmpresa: number;
  nombreEmpresa: string;
  CifDni: string;
  FechaAlta: Date;
  Activa: boolean;

  constructor(nombre: string, cif: string) {
    this.codigoEmpresa = -1;
    this.nombreEmpresa = nombre;
    this.CifDni = cif;
    this.FechaAlta = new Date();
    this.Activa = false;
  }

}
