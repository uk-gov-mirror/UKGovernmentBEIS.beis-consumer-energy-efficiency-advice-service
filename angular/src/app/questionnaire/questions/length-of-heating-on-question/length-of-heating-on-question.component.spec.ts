import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {LengthOfHeatingOnQuestionComponent} from "./length-of-heating-on-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";

describe('LengthOfHeatingOnQuestionComponent', () => {
    let component: LengthOfHeatingOnQuestionComponent;
    let fixture: ComponentFixture<LengthOfHeatingOnQuestionComponent>;
    let responseData: ResponseData;

    const originalLengthOfHeatingOn = 10;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LengthOfHeatingOnQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(LengthOfHeatingOnQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        component.response = originalLengthOfHeatingOn;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original length of heating on in response data', async(() => {
        fixture.whenStable().then(() => {
            const lengthOfHeatingOnInput = fixture.debugElement.query(By.css('input'));
            expect(lengthOfHeatingOnInput.nativeElement.value).toBe(originalLengthOfHeatingOn.toString());
        });
    }));

    it('should set the length of heating on given a valid input', () => {
        // given
        const expectedLengthOfHeatingOn = 15;

        // when
        const lengthOfHeatingOnInput = fixture.debugElement.query(By.css('input'));
        lengthOfHeatingOnInput.nativeElement.value = expectedLengthOfHeatingOn;
        lengthOfHeatingOnInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(component.response).toBe(expectedLengthOfHeatingOn);
        expect(responseData.lengthOfHeatingOn).toBe(expectedLengthOfHeatingOn);
    });
});
