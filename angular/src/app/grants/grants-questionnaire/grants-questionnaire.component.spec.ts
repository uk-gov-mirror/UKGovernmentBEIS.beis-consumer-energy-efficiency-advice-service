import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {GrantsQuestionnaireComponent} from './grants-questionnaire.component';
import {ResponseData} from "../../shared/response-data/response-data";

describe('GrantsQuestionnaireComponent', () => {
    let component: GrantsQuestionnaireComponent;
    let fixture: ComponentFixture<GrantsQuestionnaireComponent>;
    let router: Router;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;
    const responseData = new ResponseData();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GrantsQuestionnaireComponent,
                MockQuestionnaireComponent
            ],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ResponseData, useValue: responseData},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantsQuestionnaireComponent);
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
        expect(mockQuestionnaireComponent.questionnaireName).toBe('grants');
    });

    it('should navigate to results page when questionnaire is complete', () => {
        // given
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/js/energy-efficiency/results']);
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
