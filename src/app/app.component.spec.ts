import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {


  let fixture: ComponentFixture<AppComponent>; 
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent); // Crear una instancia del componente
    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    app = fixture.componentInstance; // Acceder a las propiedades del componentes .ts

  });



  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('shoud be 3'), () => {
    // A: Arrange
    const num1 = 1;
    const num2 = 2;
    //A: Act
    const result = num1 + num2;
    //A: Assert
    expect(result).toBe(3);
  }

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect( compiled.querySelector('router-outlet') ).not.toBeNull();
  });
});
