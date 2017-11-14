import {Component, EventEmitter, Input, Output} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {async, ComponentFixture, getTestBed, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {EnergyEfficiencyQuestionnaireComponent} from "./energy-efficiency-questionnaire.component";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";

describe('EnergyEfficiencyQuestionnaireComponent', () => {
    let component: EnergyEfficiencyQuestionnaireComponent;
    let fixture: ComponentFixture<EnergyEfficiencyQuestionnaireComponent>;
    let router: Router;
    let mockQuestionnaireElement;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    const questionnaireName = 'home-basics';

    class MockActivatedRoute {
        private static paramMapGet(key) {
            if (key === 'name') {
                return questionnaireName;
            } else {
                throw new Error('Unexpected parameter name');
            }
        }

        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyQuestionnaireComponent,
                MockQuestionnaireComponent
            ],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyQuestionnaireComponent);
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockQuestionnaireElement = fixture.debugElement.query(By.directive(MockQuestionnaireComponent));
        mockQuestionnaireComponent = mockQuestionnaireElement.injector.get(MockQuestionnaireComponent) as MockQuestionnaireComponent;
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should load the correct questionnaire', () => {
        // then
        expect(mockQuestionnaireComponent.questionnaireName).toBe(questionnaireName);
    });

    it('should navigate to results page when questionnaire is completed', async(() => {
        // when
        mockQuestionnaireComponent.onQuestionnaireComplete.emit();

        // then
        fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/js/energy-efficiency/results']);
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