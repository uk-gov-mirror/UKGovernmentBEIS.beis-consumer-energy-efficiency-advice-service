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
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of storeys in response data', async(() => {
        fixture.whenStable().then(() => {
            let storeysInput = fixture.debugElement.query(By.css('input.storeys-input'));
            expect(storeysInput.nativeElement.value).toBe(originalNumberOfStoreys.toString());
        });
    }));

    it('should set the response given a valid number of storeys', () => {
        // given
        const expectedStoreys = 5;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input.storeys-input'));
        storeysInput.nativeElement.value = expectedStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfStoreys).toBe(expectedStoreys);
    });

    it('should notify of completion given a valid number of storeys', () => {
        // given

        // when
        let storeysInput = fixture.debugElement.query(By.css('input.storeys-input'));
        storeysInput.nativeElement.value = 6;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });

    it('should not set the response nor notify of completion given an invalid number of storeys', () => {
        // given
        const invalidStoreys = 0;

        // when
        let storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = invalidStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.numberOfStoreys).not.toBe(invalidStoreys);
        expect(component.notifyOfCompletion).not.toHaveBeenCalled();
    });

    it('should increase and decrease storeys when buttons are clicked', () => {
        // given
        let decreaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '-');
        let increaseButton = fixture.debugElement.query(de => de.nativeElement.textContent === '+');

        // when
        decreaseButton.nativeElement.click();

        // then
        expect(responseData.numberOfStoreys).toBe(originalNumberOfStoreys - 1);
        expect(component.notifyOfCompletion).toHaveBeenCalled();

        // when
        increaseButton.nativeElement.click();

        // then
        expect(responseData.numberOfStoreys).toBe(originalNumberOfStoreys);
    });
});
