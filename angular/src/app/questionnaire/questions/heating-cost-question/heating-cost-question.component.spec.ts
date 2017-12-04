import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {HeatingCostQuestionComponent} from "./heating-cost-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('HeatingCostQuestionComponent', () => {
    let component: HeatingCostQuestionComponent;
    let fixture: ComponentFixture<HeatingCostQuestionComponent>;
    let responseData: ResponseData;

    const originalHeatingCost = 30;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeatingCostQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(HeatingCostQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        component.response = originalHeatingCost;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original heating cost in response data', async(() => {
        fixture.whenStable().then(() => {
            const heatingCostInput = fixture.debugElement.query(By.css('input'));
            expect(heatingCostInput.nativeElement.value).toBe(originalHeatingCost.toString());
        });
    }));

    it('should set the heating cost given a valid heating cost', () => {
        // given
        const expectedHeatingCost = 15;

        // when
        const heatingCostInput = fixture.debugElement.query(By.css('input'));
        heatingCostInput.nativeElement.value = expectedHeatingCost;
        heatingCostInput.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // then
        expect(component.response).toBe(expectedHeatingCost);
        expect(responseData.heatingCost).toBe(expectedHeatingCost);
    });

    it('should set value to 0 and notify of completion when clicking "I don\'t know".', () => {
        // given

        // when
        const button = fixture.debugElement.query(By.css('#do-not-know-button'));
        button.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
        expect(responseData.heatingCost).toBe(0);
    });
});
