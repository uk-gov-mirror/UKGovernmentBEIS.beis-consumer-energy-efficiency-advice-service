import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {StoreysQuestionComponent} from "./storeys-question.component";
import {By} from "@angular/platform-browser";
import {ResponseData} from "../response-data";
import {StoreysQuestion} from "./storeys-question";
import {FormsModule} from "@angular/forms";

describe('StoreysQuestionComponent', () => {
    let component: StoreysQuestionComponent;
    let fixture: ComponentFixture<StoreysQuestionComponent>;
    let responseData: ResponseData;

    const originalNumberOfStoreys: number = 10;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoreysQuestionComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreysQuestionComponent);
        component = fixture.componentInstance;

        responseData = new ResponseData();
        responseData.numberOfStoreys = originalNumberOfStoreys;

        component.question = new StoreysQuestion(responseData);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of storeys in response data', async(() => {
        fixture.whenStable().then(() => {
            let storeysInput = fixture.debugElement.query(By.css('input'));
            expect(storeysInput.nativeElement.value).toBe(originalNumberOfStoreys.toString());
        });
    }));

    it('should set the response given a valid number of storeys', () => {
        // given
        const expectedStoreys = 5;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = expectedStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfStoreys).toBe(expectedStoreys);
    });

    it('should not set the response given an invalid number of storeys', () => {
        // given
        const invalidStoreys = 0;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = invalidStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfStoreys).not.toBe(invalidStoreys);
    });

    it('should increase and decrease storeys when buttons are clicked', () => {
        // given
        let decreaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '-');
        let increaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '+');

        // when
        decreaseButton.nativeElement.click();

        // then
        expect(responseData.numberOfStoreys).toBe(originalNumberOfStoreys - 1);

        // when
        increaseButton.nativeElement.click();

        // then
        expect(responseData.numberOfStoreys).toBe(originalNumberOfStoreys);
    });
});
