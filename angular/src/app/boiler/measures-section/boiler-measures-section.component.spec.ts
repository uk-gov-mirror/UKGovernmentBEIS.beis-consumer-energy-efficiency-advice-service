import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";

import {BoilerMeasuresSectionComponent} from "./boiler-measures-section.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

describe('BoilerMeasuresSectionComponent', () => {
    let component: BoilerMeasuresSectionComponent;
    let fixture: ComponentFixture<BoilerMeasuresSectionComponent>;
    let basicsQuestionnaireComplete: boolean = false;

    const questionnaireServiceStub = {
        isComplete: () => basicsQuestionnaireComplete
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMeasuresSectionComponent,
                RecommendationCardComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
            providers: [
                {provide: QuestionnaireService, useValue: questionnaireServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMeasuresSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
