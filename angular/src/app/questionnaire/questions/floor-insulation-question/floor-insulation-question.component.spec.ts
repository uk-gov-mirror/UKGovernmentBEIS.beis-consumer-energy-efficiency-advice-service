import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";
import {FloorInsulationQuestionComponent} from "./floor-insulation-question.component";
import {FloorInsulation} from "./floor-insulation";

describe('FloorInsulationQuestionComponent', () => {
    let component: FloorInsulationQuestionComponent;
    let fixture: ComponentFixture<FloorInsulationQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FloorInsulationQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(FloorInsulationQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.floorInsulation = FloorInsulation.SolidFloor;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#option-1')).nativeElement;
            expect(yesOption.checked).toBeTruthy();
        });
    }));

    it('should set the response', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#option-0')).nativeElement;
            yesOption.click();

            expect(responseData.floorInsulation).toBe(FloorInsulation.DontKnow);
        });
    }));
});
