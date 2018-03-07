import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {OptionalPropertyQuestionComponent} from './optional-property-question.component';

describe('OptionalPropertyQuestionComponent', () => {
    let component: OptionalPropertyQuestionComponent;
    let fixture: ComponentFixture<OptionalPropertyQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionalPropertyQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(OptionalPropertyQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.shouldIncludeOptionalPropertyQuestions = true;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#yes-option'));
            expect(yesOption.classes.selected).toBeTruthy();
        });
    }));

    it('should set the response', () => {
        // when
        const yesOption = fixture.debugElement.query(By.css('#yes-option')).nativeElement;
        yesOption.click();

        // then
        expect(responseData.shouldIncludeOptionalPropertyQuestions).toBeTruthy();
    });
});
