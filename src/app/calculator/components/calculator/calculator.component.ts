import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

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

  public calculatorButtons = viewChildren(CalculatorButtonComponent); // hace referencia a todos los componentes hijos de ese tipo es decir <calculator-button/>

  handleClick(key:string){
    console.log({key});
  }

  handleKeyboardEvent(event: KeyboardEvent){

    
    //tabla de comparacion conm su tipado
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Backspace: 'C',
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
