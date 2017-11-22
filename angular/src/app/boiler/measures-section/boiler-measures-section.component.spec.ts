import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

import {BoilerMeasuresSectionComponent} from "./boiler-measures-section.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

describe('BoilerMeasuresSectionComponent', () => {
    let component: BoilerMeasuresSectionComponent;
    let fixture: ComponentFixture<BoilerMeasuresSectionComponent>;
    let router: Router;
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
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to the home basics questionnaire when the link is clicked and the questionnaire is not complete', () => {
        // given
        basicsQuestionnaireComplete = false;

        // when
        fixture.debugElement.query(By.css('.link-button')).nativeElement.click();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/js/energy-efficiency/questionnaire/home-basics']);
    });

    it('should navigate to the main results page when the link is clicked and the basics questionnaire is complete', () => {
        // given
        basicsQuestionnaireComplete = true;

        // when
        fixture.debugElement.query(By.css('.link-button')).nativeElement.click();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/js/energy-efficiency/results']);
    });

    it('should show a recommendation card for each measure', () => {
        // given
        const expectedMeasures = require('assets/test/boiler-page-measures.json');
        component.measures = expectedMeasures;

        // when
        fixture.detectChanges();

        // then
        const recommendationCards = fixture.debugElement.queryAll(By.directive(RecommendationCardComponent));
        const actualMeasures = recommendationCards.map(el => el.componentInstance.recommendation);

        expect(actualMeasures.length).toBe(expectedMeasures.length);
        expectedMeasures.forEach(measure => expect(actualMeasures).toContain(measure));
    });
});
