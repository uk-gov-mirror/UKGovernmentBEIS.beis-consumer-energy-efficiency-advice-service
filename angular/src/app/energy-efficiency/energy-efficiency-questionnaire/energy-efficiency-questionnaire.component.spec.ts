import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {EnergyEfficiencyQuestionnaireComponent} from './energy-efficiency-questionnaire.component';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';

describe('EnergyEfficiencyQuestionnaireComponent', () => {
    let component: EnergyEfficiencyQuestionnaireComponent;
    let fixture: ComponentFixture<EnergyEfficiencyQuestionnaireComponent>;
    let router: Router;
    let responseData: ResponseData;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    const questionnaireName = 'home-basics';

    class MockActivatedRoute {

        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });

        private static paramMapGet(key) {
            if (key === 'name') {
                return questionnaireName;
            } else {
                throw new Error('Unexpected parameter name');
            }
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyQuestionnaireComponent,
                MockQuestionnaireComponent
            ],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                ResponseData,
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyQuestionnaireComponent);
        router = TestBed.get(Router);
        responseData = TestBed.get(ResponseData);
        spyOn(router, 'navigate');
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockQuestionnaireComponent = fixture.debugElement.query(By.directive(MockQuestionnaireComponent)).componentInstance;
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should load the correct questionnaire', () => {
        // then
        expect(mockQuestionnaireComponent.questionnaireName).toBe(questionnaireName);
    });

    it('should navigate to results page when questionnaire is completed if grants journey not selected', async(() => {
        // given
        responseData.shouldIncludeGrantsQuestionnaire = false;

        // when
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/js/energy-efficiency/results']);
        });
    }));

    it('should navigate to grants questionnaire when questionnaire is completed if grants journey not selected', async(() => {
        // given
        responseData.shouldIncludeGrantsQuestionnaire = true;

        // when
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/js/grants/questionnaire']);
        });
    }));
});

@Component({
    selector: 'app-questionnaire',
    template: '<p>Mock Questionnaire Component</p>'
})
class MockQuestionnaireComponent {
    @Input() public questionnaireName: string;
    @Output() public onQuestionnaireComplete: EventEmitter<void> = new EventEmitter<void>();
}
