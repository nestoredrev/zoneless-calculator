
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import CalculatorViewComponent from "./calculator-view.component";

describe('CalculatorView Component', () => {

    let fixture: ComponentFixture<CalculatorViewComponent>; 
    let compiled: HTMLElement;
    let component: CalculatorViewComponent;
    beforeEach( async () => {

        await TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([])]
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorViewComponent); // Crear una instancia del componente
        compiled = fixture.nativeElement as HTMLElement; // Acceder a todos los elementos del componente .html
        component = fixture.componentInstance; // Acceder a las propiedades del componentes .ts

    });

    it('should be created', () => {

        expect(component).toBeTruthy();

    })

    it('should contain calculator component', () => {

        expect(compiled.querySelector('calculator')).not.toBeNull();

    })


    it('should contain basic css classes', () => {

        const divElement = compiled.querySelector('div');
        const divClasses = divElement?.classList.value.split(' ');

        const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

        shouldHave.forEach( className => {
            expect(divClasses).toContain(className);
        })

    })



})