import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import {QuestionReasonComponent} from './question-reason.component';

describe('QuestionReasonComponent', () => {
    let component: QuestionReasonComponent;
    let fixture: ComponentFixture<QuestionReasonComponent>;

    const questionReason = 'this question helps us show you useful results';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuestionReasonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionReasonComponent);
        component = fixture.componentInstance;
        component.questionReason = questionReason;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    describe('when clicking on the button', () => {
        it('should display the question reason if currently hidden', async(() => {
            // when
            clickToggleQuestionReasonButtonAndDetectChanges();

            // then
            fixture.whenStable().then(() => {
                const questionReasonElement = fixture.debugElement.query(By.css('.question-reason'));
                expect(questionReasonElement.classes.visible).toBeTruthy();
                expect(questionReasonElement.nativeElement.innerText).toBe(questionReason);
            });
        }));

        it('should hide the question reason if currently displayed', async(() => {
            // given
            component.isExpanded = true;

            // when
            clickToggleQuestionReasonButtonAndDetectChanges();

            // then
            fixture.whenStable().then(() => {
                const questionReasonElement = fixture.debugElement.query(By.css('.question-reason'));
                expect(questionReasonElement.classes.visible).toBeFalsy();
            });
        }));

        function clickToggleQuestionReasonButtonAndDetectChanges(): void {
            const toggleQuestionReasonButton = fixture.debugElement.query(By.css('.question-reason-button'));
            toggleQuestionReasonButton.nativeElement.click();
            fixture.detectChanges();
        }
    });
});
