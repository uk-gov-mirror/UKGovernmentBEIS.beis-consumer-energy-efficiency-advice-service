import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {MeesQuestionnaireComponent} from './mees-questionnaire.component';

describe('MeesQuestionnaireComponent', () => {
    let component: MeesQuestionnaireComponent;
    let fixture: ComponentFixture<MeesQuestionnaireComponent>;
    let router: Router;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MeesQuestionnaireComponent,
                MockQuestionnaireComponent
            ],
            imports: [RouterTestingModule.withRoutes([])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeesQuestionnaireComponent);
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
        expect(mockQuestionnaireComponent.questionnaireName).toBe('mees');
    });

    it('should navigate to results page when questionnaire is complete', () => {
        // given
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/minimum-energy-efficiency-standards/results']);
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
