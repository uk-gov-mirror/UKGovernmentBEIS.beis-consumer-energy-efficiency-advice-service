import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {DetailedLengthOfHeatingOnQuestionComponent} from "./detailed-length-of-heating-on-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DetailedLengthOfHeatingOnQuestionComponent', () => {
    let component: DetailedLengthOfHeatingOnQuestionComponent;
    let fixture: ComponentFixture<DetailedLengthOfHeatingOnQuestionComponent>;
    let responseData: ResponseData;

    const originalEarlyHours: number = 2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailedLengthOfHeatingOnQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(DetailedLengthOfHeatingOnQuestionComponent);
        component = fixture.componentInstance;
        component.earlyHours = originalEarlyHours;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of early hours in response data', async(() => {
        fixture.whenStable().then(() => {
            const earlyHoursInput = fixture.debugElement.query(By.css('.early-hours-input input'));
            expect(earlyHoursInput.nativeElement.value).toBe(originalEarlyHours.toString());
        });
    }));

    it('should set the response given a valid number of early hours', () => {
        // given
        const expectedEarlyHours = 5;

        // when
        const earlyHoursInput = fixture.debugElement.query(By.css('.early-hours-input input'));
        earlyHoursInput.nativeElement.value = expectedEarlyHours;
        earlyHoursInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.earlyHours).toBe(expectedEarlyHours);
    });
});
