
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

// Mocker el servicio para ser utilizado dentro del componente
class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {


  let fixture: ComponentFixture<CalculatorComponent>; 
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers:[
        {
          provide: CalculatorService,
          useClass: MockCalculatorService // se va utilizar la clase mockeada en vez del la clase del serivicio original
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent); // Crear una instancia del componente
    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    component = fixture.componentInstance; // Acceder a las propiedades del componentes .ts
    mockCalculatorService = TestBed.inject( CalculatorService ) as unknown as MockCalculatorService;

    // fixture.detectChanges();

  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect( component.resultText() ).toBe('100.00');
    expect( component.subResultText() ).toBe('0');
    expect( component.lastOperator() ).toBe('+');
  });

  it('should display proper calculation values', () => {

    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect( compiled.querySelector('span')?.innerText ).toBe('456 *'); // lo que aparece por pantalla al pulsar los botones
    
    expect( component.resultText() ).toBe('123');
    expect( component.subResultText() ).toBe('456');
    expect( component.lastOperator() ).toBe('*');

  });


  it('should have 19 calculator-button components', () => {

    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);

  });


  it('should have 19 calculator-button with content proyection', () => {

    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');

  });


  it('should handle keyboard events correcly', () => {
    
    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent( eventEnter );
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', {key: 'Escape'});
    document.dispatchEvent( eventESC );
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

  });


  it('should display result text correcly', () => {

    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    
    fixture.detectChanges();

    expect( component.resultText() ).toBe('123');
    expect( compiled.querySelector('#sub-result')?.textContent ).toContain('10 -'); // toContaion no es sensible a los espacio al principio y al final

  });

});