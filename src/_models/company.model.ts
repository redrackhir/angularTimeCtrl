import { formatDate } from '@angular/common';

export class Company {
  codigoEmpresa: number;
  contrasenya: string;
  nombreEmpresa: string;
  cifDni: string;
  fechaAlta: Date;
  activa: boolean;

  constructor(nombre: string, cif: string) {
    this.codigoEmpresa = -1;
    this.contrasenya = this.generatePassword();
    this.nombreEmpresa = nombre;
    this.cifDni = cif;
    this.fechaAlta = new Date();
    this.activa = true;
  }

  generatePassword(): string {
    let i: number;
    let psw = '';
    let c = 0;
    for (i = 0; i < 3; i++) {
      c = Math.round(Math.random() * 9) + 48;
      psw += String.fromCharCode(c);
      c = Math.round(Math.random() * 26) + 64;
      psw += String.fromCharCode(c);
      c = Math.round(Math.random() * 25) + 97;
      psw += String.fromCharCode(c);
    }
    return psw;
  }


}
