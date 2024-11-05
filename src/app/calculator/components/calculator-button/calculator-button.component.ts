import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, OnInit } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'myAttribute',
    // 'data-size': 'XL'
  }
})
export class CalculatorButtonComponent implements OnInit {
  
  // InputSignal -> Son las entradas de HostComponent basadas en señas
  public isCommand = input( false, {
    transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value 
  })

  public isDoubleSize = input( false, {
    transform: ( value: boolean | string ) => typeof value === 'string' ? value === '' : value 
  })

  //Permite acceder a los atributos y propiedades del component host
  // @HostBinding('is-command') get commandStyle(){
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4') get commandStyle(){
    return this.isDoubleSize();
  }

  ngOnInit(): void {
    
  }

}
