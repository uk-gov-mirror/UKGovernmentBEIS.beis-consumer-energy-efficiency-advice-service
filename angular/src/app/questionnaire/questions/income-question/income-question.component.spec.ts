import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {IncomeQuestionComponent} from "./income-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('IncomeQuestionComponent', () => {
    let component: IncomeQuestionComponent;
    let fixture: ComponentFixture<IncomeQuestionComponent>;

    const originalIncome: number = 123456;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IncomeQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IncomeQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalIncome;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original income in response data', async(() => {
        fixture.whenStable().then(() => {
            let incomeInput = fixture.debugElement.query(By.css('input'));
            expect(incomeInput.nativeElement.value).toBe(originalIncome.toString());
        });
    }));

    it('should set the response given a valid income', () => {
        // given
        const expectedInput = 18;

        // when
        let incomeInput = fixture.debugElement.query(By.css('input'));
        incomeInput.nativeElement.value = expectedInput;
        incomeInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedInput);
    });
});
