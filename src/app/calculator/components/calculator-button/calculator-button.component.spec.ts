import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

// Necesario de crear instancia del componente para poder testear la proyeccion
@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
      <calculator-button>
        <span class="projected-content underline">Test content</span>
      </calculator-button>
  `
})
class TestHostComponent {}

describe('CalculatorBotton Component', () => {


  let fixture: ComponentFixture<CalculatorButtonComponent>; 
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent); // Crear una instancia del componente
    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    component = fixture.componentInstance; // Acceder a las propiedades del componentes .ts

    fixture.detectChanges(); // esperar para la deteccion de cambios por ejemplo inicializacion del componente

  });


  it('should create the app', () => {
    expect(component).toBeTruthy();
  });


  it('should apply w-1/4 doubleSize when is false', () => {

    const hostCssClasses:string[] = compiled.classList.value.split(' ');
    
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse(); // false es el valor por defecto

  });

  it('should apply w-2/4 doubleSize when is true', () => {

    // estas dos lineas tienen que ser primeras para que el expect funcione
    fixture.componentRef.setInput('isDoubleSize', true); // setear la señal a true y detectar los cambios
    fixture.detectChanges();

    const hostCssClasses:string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue(); 

  });

  it('should emit onClick when handleClick is called', () => {

    // Espias o Spay son pendiente sobre algun suseto como click, cambios en formularios etc...
    spyOn( component.onClick, 'emit' );
    component.contentValue()!.nativeElement.innerText = '1';

    component.handleClick();

    expect( component.onClick.emit ).toHaveBeenCalledWith('1');

  });


  it('should set isPressed to true and then false when keyBoardPressStyle is called with matching key', (done) => {

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect( component.isPressed() ).toBeTrue();

    setTimeout(() => {
      expect( component.isPressed() ).toBeFalse();
      done(); // se espera hasta que termine el timeout
    }, 101);

  });

  it('should not set isPressed to true if key is not matching', () => {

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');

    expect( component.isPressed() ).toBeFalse();

  });


  it('should display proyected content', () => {

    const testHostFixure = TestBed.createComponent( TestHostComponent );
    const compiled = testHostFixure.nativeElement as HTMLDivElement;
    const proyectedContent = compiled.querySelector('.projected-content');

    expect( proyectedContent ).not.toBeNull();
    expect( proyectedContent?.classList.contains('underline')).toBeTrue();
    expect( proyectedContent?.innerHTML ).toBe('Test content');
    
    
    


  })

});