import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';
import {GreenHomesGrantQuestionnaireComponent} from "./green-homes-grant-questionnaire.component";

describe('GreenHomesGrantQuestionnaireComponent', () => {
    let component: GreenHomesGrantQuestionnaireComponent;
    let fixture: ComponentFixture<GreenHomesGrantQuestionnaireComponent>;
    let router: Router;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GreenHomesGrantQuestionnaireComponent,
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
        fixture = TestBed.createComponent(GreenHomesGrantQuestionnaireComponent);
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
        expect(mockQuestionnaireComponent.questionnaireName).toBe('green-homes-grant');
    });

    it('should navigate to results page when questionnaire is complete', () => {
        // given
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/green-homes-grant/results']);
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
