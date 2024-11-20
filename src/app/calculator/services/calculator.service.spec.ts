
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

    let service: CalculatorService;
    // Ciclo de vida de las pruebas unitarias
    beforeEach( () => {

        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);

    });
    beforeAll( () =>{});
    afterEach( () =>{});
    afterAll( () =>{});



    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('check inputs in range of static valid inputs', () => {

        const numbers = ['0','1','2','3','4','5','6','7','8','9'];
        const operators = ['+','-','*','/','÷', 'x','%'];
        const specialOperators = ['+/-','%','.','=','C','Backspace'];
        
        service.constructNumber('ñ');

        expect( [...numbers, ...operators, ...specialOperators].includes('ñ') ).toBeFalse();
    })

    it('should be create with default values', () => {

        expect( service.resultText() ).toBe('0');
        expect( service.subResultText() ).toBe('0');
        expect( service.lastOperator() ).toBe('+');

    })

    it('should set resultText, subResultText to "0" when C is pressed ', () => {

        service.resultText.set('123');
        service.subResultText.set('1234');
        service.lastOperator.set('*');

        service.constructNumber('C');

        expect( service.resultText() ).toBe('0');
        expect( service.subResultText() ).toBe('0');
        expect( service.lastOperator() ).toBe('+');

    });

    it('should update resultText with number input', () => {

        service.constructNumber('1');
        expect( service.resultText() ).toBe('1');
        
        service.constructNumber('2');
        expect( service.resultText() ).toBe('12');

    })


    it('sould handle operators correcly', () => {

        service.constructNumber('1');
        service.constructNumber('-');

        expect( service.lastOperator() ).toBe('-');
        expect( service.subResultText() ).toBe('1');
        expect( service.resultText() ).toBe('0');

    })

    it('sould calculate result correcly for addition', () => {
        
        service.constructNumber('9');
        service.constructNumber('9');
        service.constructNumber('+');
        service.constructNumber('2');
        service.constructNumber('=');

        expect( service.resultText() ).toBe('101');

    })

    it('sould calculate result correcly for substraction', () => {
        
        service.constructNumber('9');
        service.constructNumber('9');
        service.constructNumber('-');
        service.constructNumber('9');
        service.constructNumber('5');
        service.constructNumber('=');

        expect( service.resultText() ).toBe('4');

    })

    it('sould calculate result correcly for multiplication', () => {
        
        service.constructNumber('7');
        service.constructNumber('*');
        service.constructNumber('8');
        service.constructNumber('=');

        expect( service.resultText() ).toBe('56');

    })


    it('sould calculate result correcly for division', () => {
        
        service.constructNumber('1');
        service.constructNumber('5');
        service.constructNumber('/');
        service.constructNumber('3');
        service.constructNumber('=');

        expect( service.resultText() ).toBe('5');

    })

    it('sould calculate result correcly for percent', () => {
        
        service.constructNumber('5');
        service.constructNumber('%');
        service.constructNumber('3');
        service.constructNumber('0');
        service.constructNumber('=');

        expect( service.resultText() ).toBe('1.5');

    })


    it('sould handle decimal point correcly', ()=> {
        
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('5');

        expect( service.resultText() ).toBe('1.5');

    })

    it('sould handle decimal point correcly starting with zero', ()=> {
        
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('0');

        expect( service.resultText() ).toBe('0.0');

    })

    it('should handle sign change correcly', () => {

        service.constructNumber('1');
        service.constructNumber('+/-');
        expect( service.resultText() ).toBe('-1');

        service.constructNumber('+/-');
        expect( service.resultText() ).toBe('1');

    })

    it('should handle backspace correcly', () => {

        service.constructNumber('2');
        service.constructNumber('1');
        service.constructNumber('Backspace');
        expect( service.resultText() ).toBe('2');
        service.constructNumber('Backspace');
        expect( service.resultText() ).toBe('0');

    })

    it('check backspace when its one negative number', () => {

        service.resultText.set('-1');
        expect( service.resultText().length ).toBe(2);
        service.constructNumber('Backspace');

        expect( service.resultText() ).toBe('0');

    })

    it('check backspace when its nothing to erase', () => {

        service.constructNumber('0');
        service.constructNumber('Backspace');
        expect( service.resultText() ).toBe('0');

    })

    it('check when is negative 0', () => {

        service.resultText.set('-0');
        service.constructNumber('9');
        expect( service.resultText() ).toBe('-9');

    })

    it('should handle max length correcly', () => {

        for (let i = 0; i < 10; i++) {
            service.constructNumber('1');
        }

        expect( service.resultText().length ).toBe(10);
        service.constructNumber('1');
        expect( service.resultText().length ).toBe(10);

    })

})