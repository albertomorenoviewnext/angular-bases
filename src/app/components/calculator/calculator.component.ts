import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  public pantalla: string = '0';
  public num1: string = '0';
  public num2: string = '0';
  public oper: string = '0';
  public cont: number = 0;
  private n1: number = 0;
  private n2: number = 0;

  num(numero: string) {
    if (this.pantalla !== '0' && this.num2 !== '0' && this.oper === '0') {
      this.num1 = numero;
      this.num2 = '0';
      this.pantalla = numero;
    } else if (this.pantalla === '0') {
      this.num1 = numero;
      this.pantalla = numero;
    } else if (this.num1 === '0') {
      this.num1 = numero;
      this.pantalla += numero;
    } else {
      this.num1 += numero;
      this.pantalla += numero;
    }
  }

  coma() {
    if (this.oper === '0' && this.num2 !== '0') {
      this.pantalla = '0.';
      this.num1 = '0.';
      this.num2 = '0';
      this.oper = '0';
    } else if (this.num1 === '0') {
      this.num1 = '0.';
      this.pantalla = '0.';
    } else if (this.num1.indexOf('.') == -1) {
      this.num1 += '.';
      this.pantalla += '.';
    }
  }

  c() {
    this.num1 = '0';
    this.num2 = '0';
    this.oper = '0';
    this.pantalla = '0';
  }

  op(valor: string) {
    if (this.pantalla !== '0' && this.num1 !== '0' && this.num2 !== '0') {
      this.igual();
      this.oper = valor;
      this.pantalla += this.oper;
    } else if (this.pantalla !== '0') {
      this.oper = valor;
      if (this.num1 === '0') {
        this.pantalla += this.oper;
      } else {
        this.pantalla = this.num1 + this.oper;
        this.num2 = this.num1;
        this.num1 = '0';
      }
    }
  }

  igual() {
    this.n1 = parseFloat(this.num1);
    this.n2 = parseFloat(this.num2);

    switch (this.oper) {
      case '+':
        this.n1 += this.n2;
        break;
      case '-':
        this.n1 = this.n2 - this.n1;
        break;
      case '*':
        this.n1 *= this.n2;
        break;
      case '/':
        this.n1 = this.n2 / this.n1;
        break;
    }
    this.cont++;
    localStorage.setItem(this.cont.toString(), this.pantalla + '=' + this.n1);
    this.pantalla = this.n1.toString();
    this.num2 = this.n1.toString();
    this.num1 = '0';
    this.oper = '0';
    this.log();
  }

  log() {
    var datos: any = document.getElementById("registro");
    var valor = localStorage.getItem(this.cont.toString());
    datos.innerHTML += `<p>${valor}</p>`;
  }

  limpiar() {
    localStorage.clear();
    var datos: any = document.getElementById("registro");
    datos.innerHTML = `<p></p>`;
  }
}
