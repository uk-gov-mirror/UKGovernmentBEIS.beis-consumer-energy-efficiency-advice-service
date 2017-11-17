import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {LengthOfHeatingOnQuestionComponent} from "./length-of-heating-on-question.component";

describe('LengthOfHeatingOnQuestionComponent', () => {
    let component: LengthOfHeatingOnQuestionComponent;
    let fixture: ComponentFixture<LengthOfHeatingOnQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LengthOfHeatingOnQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(async(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(LengthOfHeatingOnQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when inputting a value', () => {
        // given
        const expectedLength = 8;

        // when
        let input = fixture.debugElement.query(By.css('#length-of-heating-on-input'));
        input.nativeElement.value = expectedLength;
        input.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.lengthOfHeatingOn).toBe(expectedLength);
    });
});
