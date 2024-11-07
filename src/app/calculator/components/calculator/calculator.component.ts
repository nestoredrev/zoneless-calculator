import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)' : 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  public resultText = computed( () => this.calculatorService.resultText() ); // computed señal solamente lectura = ReadOnlySignal
  public subResultText = computed( () => this.calculatorService.subResultText() );
  public lastOperator = computed( () => this.calculatorService.lastOperator() );

  public calculatorButtons = viewChildren(CalculatorButtonComponent); // hace referencia a todos los componentes hijos de ese tipo es decir <calculator-button/>

  handleClick(key:string){
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent(event: KeyboardEvent){

    
    //tabla de comparacion conm su tipado
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Enter: '=',
      '*': 'x',
      '/': '÷',  
    }
    
    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    
    this.handleClick(keyValue);

    this.calculatorButtons().forEach( button => {
      
      button.keyboardPressedStyle(keyValue);
      
    })

  }

}
