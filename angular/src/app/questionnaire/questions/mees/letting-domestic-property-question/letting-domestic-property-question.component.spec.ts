import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {LettingDomesticPropertyQuestionComponent} from './letting-domestic-property-question.component';
import {LettingDomesticPropertyStage} from "./letting-domestic-property-stage";
import {MultipleChoiceQuestionComponent} from "../../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('LettingDomesticPropertyQuestionComponent', () => {
    let component: LettingDomesticPropertyQuestionComponent;
    let fixture: ComponentFixture<LettingDomesticPropertyQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LettingDomesticPropertyQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LettingDomesticPropertyQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        const yes = fixture.debugElement.query(By.css('.currently'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(LettingDomesticPropertyStage.Currently);
    });
});
