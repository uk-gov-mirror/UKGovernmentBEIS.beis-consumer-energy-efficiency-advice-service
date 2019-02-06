import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';
import {GrantEligibilityQuestionnaireComponent} from "./grant-eligibility-questionnaire.component";

describe('GrantEligibilityQuestionnaireComponent', () => {
    let component: GrantEligibilityQuestionnaireComponent;
    let fixture: ComponentFixture<GrantEligibilityQuestionnaireComponent>;
    let router: Router;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GrantEligibilityQuestionnaireComponent,
                MockQuestionnaireComponent
            ],
            providers: [
                ResponseData,
            ],
            imports: [RouterTestingModule.withRoutes([])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantEligibilityQuestionnaireComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockQuestionnaireComponent = fixture.debugElement.query(By.directive(MockQuestionnaireComponent)).componentInstance;
        spyOn(router, 'navigate');
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should load the correct questionnaire', () => {
        // then
        expect(mockQuestionnaireComponent.questionnaireName).toBe('grant-eligibility');
    });

    it('should navigate to results page when questionnaire is complete', () => {
        // given
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/grant-eligibility/results']);
    });
});

@Component({
    selector: 'app-questionnaire',
    template: '<p>Mock Questionnaire Component</p>'
})
class MockQuestionnaireComponent {
    @Input() public questionnaireName: string;
    @Output() public onQuestionnaireComplete: EventEmitter<void> = new EventEmitter<void>();
}
