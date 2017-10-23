import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {NumberQuestionComponent} from "./number-question.component";
import {FormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('NumberQuestionComponent', () => {
    let component: NumberQuestionComponent;
    let fixture: ComponentFixture<NumberQuestionComponent>;

    const originalQuantity = 5;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NumberQuestionComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberQuestionComponent);
        component = fixture.componentInstance;
        component.quantity = originalQuantity;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with input quantity', async(() => {
        fixture.whenStable().then(() => {
            let input = fixture.debugElement.query(By.css('input'));
            expect(input.nativeElement.value).toBe(originalQuantity.toString());
        });
    }));

    it('should emit an event given a valid quantity', () => {
        // given
        const expectedQuantity = 10;
        let emitted: number;
        component.quantityChange.subscribe(quantity => emitted = quantity);

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = expectedQuantity;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(emitted).toBe(expectedQuantity);
    });

    it('should emit an event with undefined value given an invalid quantity', () => {
        // given
        const invalidStoreys = 0;
        let hasEmitted: boolean;
        let emitted: number;
        component.quantityChange.subscribe(quantity => {
            hasEmitted = true;
            emitted = quantity;
        });

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = invalidStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(hasEmitted).toBeTruthy();
        expect(emitted).toBeUndefined();
    });

    it('should increase and decrease quantity when buttons are clicked', () => {
        // given
        let decreaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '-');
        let increaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '+');

        let emitted: number;
        component.quantityChange.subscribe(quantity => emitted = quantity);

        // when
        decreaseButton.nativeElement.click();

        // then
        expect(component.quantity).toBe(originalQuantity - 1);
        expect(emitted).toBe(originalQuantity - 1);

        // when
        increaseButton.nativeElement.click();

        // then
        expect(component.quantity).toBe(originalQuantity);
        expect(emitted).toBe(originalQuantity);
    });
});
