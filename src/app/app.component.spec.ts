import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {


  let fixture: ComponentFixture<AppComponent>; 
  let compiled: HTMLElement;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent); // Crear una instancia del componente
    compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
    app = fixture.componentInstance; // Acceder a las propiedades del componentes .ts

  });



  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('shoud be 3', () => {
    // A: Arrange
    const num1 = 1;
    const num2 = 2;
    //A: Act
    const result = num1 + num2;
    //A: Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect( compiled.querySelector('router-outlet') ).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {

    const divElement  = compiled.querySelector('#wrappedRouterOutlet');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    mustHaveClasses.forEach( (className) => {
      expect(divClasses).toContain( className );
    });
  });

  it('should contain "buy me a beer" link', () => {

    //anchorElement.title = 'Buy me a beer';
    const anchorElement = compiled.querySelector('#buyBeerLink');
    expect(anchorElement).not.toBeNull();

    const title = anchorElement?.getAttribute('title');
    const beerLink = anchorElement?.getAttribute('href');

    expect(title).toBe('Buy me a beer');
    expect(beerLink).toBe('https://www.buymeacoffee.com/scottwindon');

  })

});
