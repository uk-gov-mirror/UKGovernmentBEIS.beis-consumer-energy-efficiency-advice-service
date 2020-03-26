import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {PropertyEpcQuestionComponent} from './property-epc-question.component';
import {UserEpcRating} from './user-epc-rating';
import {MultipleChoiceQuestionComponent} from "../../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('PropertyEpcQuestionComponent', () => {
    let component: PropertyEpcQuestionComponent;
    let fixture: ComponentFixture<PropertyEpcQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PropertyEpcQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PropertyEpcQuestionComponent);
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
        const yes = fixture.debugElement.query(By.css('.at-least-e'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(UserEpcRating.AtLeastE);
    });
});
