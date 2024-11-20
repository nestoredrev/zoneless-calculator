import { Injectable, signal } from '@angular/core';


const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['+','-','*','/','÷', 'x','%'];
const specialOperators = ['+/-','%','.','=','C','Backspace'];


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  constructor() { }

  public constructNumber(value: string):void {
    
    // Valid input
    if( ![...numbers, ...operators, ...specialOperators].includes(value) ){
      console.log('Invalid input');
      return;
    }

    // Calculo total
    if( value === '=' ){
      this.calculateResults();
      return;
    }

    // Limpiar resultados
    if( value === 'C' ){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Backspace
    //TODO revisar cuando tengamos numeros negativos
    if( value === 'Backspace' ){
      
      // No hay nada que borrar
      if( this.resultText() === '0' ) return;
      if( this.resultText().includes('-') && this.resultText().length === 2 ){
        this.resultText.set('0');
        return;
      }
      
      // si hay un solo digito por borrar
      if( this.resultText().length === 1 ){
        this.resultText.set('0');
        return;
      }

      this.resultText.update( prevValue => prevValue.slice(0, -1) ); // eliminar la ultima posicion
      return;
    }

    // Aplicar operador
    if( operators.includes(value) ){
      this.calculateResults();
      this.lastOperator.set(value);
      this.subResultText.set( this.resultText() );
      this.resultText.set('0');
      return;
    }

    // Limitar numero de caracteres
    if( this.resultText().length >= 10 ){
      console.log('Max length reached');
      return;
    }

    // Validar punto decimal
    if( value === '.' && !this.resultText().includes('.') ){ // validar si hay punto y si ya tiene uno puesto
      if( this.resultText() === '0' || this.resultText() === '' ){
        this.resultText.set('0.');
        return;
      }
      this.resultText.update( prevValue => prevValue + '.' );
      return;
    }

    // Manejo del 0 inicial
    if( 
        value === '0' && 
        ( this.resultText() === '0' || this.resultText() === '-0' )
      ){
        return;
    }

    // Cambio de signo
    if( value === '+/-' ){
      if( this.resultText().includes('-') ){
        this.resultText.update( prevValue => prevValue.slice(1) ); // corta el primer caracter '-'
        return;
      }

      this.resultText.update( prevValue => '-' + prevValue );
      return;
    }

    // Validacion Numeros
    if( numbers.includes(value) ){

      if( this.resultText() === '0' ){
        this.resultText.set(value);
        return;
      }

      if( this.resultText() === '-0' ){
        this.resultText.set('-'+value);
        return;
      }

      this.resultText.update( prevValue => prevValue + value );
      return;
    }
  }

  public calculateResults(){
    const number1 = parseFloat( this.subResultText() );
    const number2 = parseFloat( this.resultText() );

    let result = 0;

    switch ( this.lastOperator() ) {
      case '+':
        result = number1 + number2;  
      break;

      case '-':
        result = number1 - number2;  
      break;

      case '*':
      case 'x':
        result = number1 * number2;  
      break;

      case '/':
      case '÷':
        result = number1 / number2;  
      break;

      case '%':
        result = ( number1 / 100) * number2;  
      break;
    }

    this.resultText.set( result.toString() );
    this.subResultText.set('0');


  }

}
