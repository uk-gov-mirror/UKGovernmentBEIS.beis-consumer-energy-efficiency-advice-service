import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {StoreysQuestionComponent} from "./storeys-question.component";
import {By} from "@angular/platform-browser";
import {ResponseData} from "../../response-data/response-data";
import {FormsModule} from "@angular/forms";
import {NumberQuestionComponent} from "../../common/number-question/number-question.component";

describe('StoreysQuestionComponent', () => {
    let component: StoreysQuestionComponent;
    let fixture: ComponentFixture<StoreysQuestionComponent>;

    const responseData: ResponseData = new ResponseData();

    const originalNumberOfStoreys: number = 10;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoreysQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreysQuestionComponent);
        component = fixture.componentInstance;
        responseData.numberOfStoreys = originalNumberOfStoreys;
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
});
