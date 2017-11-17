import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {HeatingCostQuestionComponent} from "./heating-cost-question.component";

describe('HeatingCostQuestionComponent', () => {
    let component: HeatingCostQuestionComponent;
    let fixture: ComponentFixture<HeatingCostQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeatingCostQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(async(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(HeatingCostQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when inputting a value', () => {
        // given
        const expectedCost = 1000;

        // when
        let input = fixture.debugElement.query(By.css('#heating-cost-input'));
        input.nativeElement.value = expectedCost;
        input.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(responseData.heatingCost).toBe(expectedCost);
    });

    it('should set value to 0 and notify of completion when clicking "I don\'t know".', () => {
        // given

        // when
        let button = fixture.debugElement.query(By.css('#do-not-know-button'));
        button.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
        expect(responseData.heatingCost).toBe(0);
    });
});
