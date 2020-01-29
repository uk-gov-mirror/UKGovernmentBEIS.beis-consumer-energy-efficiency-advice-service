import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {EnergyEfficiencyRecommendationCardComponent} from './energy-efficiency-recommendation-card.component';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {GrantEligibility} from '../../../grants/grant-eligibility-service/grant-eligibility';
import {BreakEvenComponent} from '../break-even/break-even.component';
import {NationalGrantForMeasure} from '../../../grants/model/national-grant-for-measure';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

describe('EnergyEfficiencyRecommendationCardComponent', () => {
    let component: EnergyEfficiencyRecommendationCardComponent;
    let fixture: ComponentFixture<EnergyEfficiencyRecommendationCardComponent>;

    const advantages = ['Green', 'Cost effective'];
    const grant: NationalGrantForMeasure = {
        grantId: 'national-grant-1',
        name: 'National Grant 1',
        description: 'some national grant',
        eligibility: GrantEligibility.LikelyEligible,
        annualPaymentPoundsForMeasure: 120,
        steps: []
    };

    const recommendation: EnergyEfficiencyRecommendation = {
        investmentPounds: 200,
        lifetimeYears: 40,
        costSavingPoundsPerYear: 100,
        minimumCostSavingPoundsPerYear: 90,
        maximumCostSavingPoundsPerYear: 110,
        energySavingKwhPerYear: 100,
        readMoreRoute: ('home-improvements/loft-insulation'),
        iconPath: 'icons/dummy.svg',
        headline: 'Loft insulation',
        summary: 'No description available',
        whatItIs: '',
        isItRightForMe: '',
        tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
        grant: grant,
        advantages: advantages,
        steps: [],
        measureCode: '',
        isAddedToPlan: false,
        recommendationID: '',
        isMeasure: true,
        dismiss: false
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyRecommendationCardComponent,
                DataCardComponent,
                BreakEvenComponent
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: RecommendationsService, use: {}},
                AbTestingService,
                GoogleAnalyticsService,
                EnergyEfficiencyDisplayService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyRecommendationCardComponent);
        component = fixture.componentInstance;
        component.recommendation = recommendation;
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should display the correct heading', () => {
            const recommendationDescriptionElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
            expect(recommendationDescriptionElement.innerText).toBe(recommendation.headline);
        });

        it('should display the correct summary', () => {
            const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
            expect(summaryElement.innerText).toBe(recommendation.summary);
        });

        it('should display the grants tag', () => {
            // given
            const tagsElements = fixture.debugElement.queryAll(By.css('.tag'));

            // then
            expect(tagsElements.length).toBe(1);
            const tagNames = tagsElements.map(element => element.nativeElement.innerText.toLowerCase());
            expect(tagNames).toContain('grants');
        });
    });

    describe('#toggleAddedToPlan', () => {
        it('should add recommendation to plan if not already added to plan', () => {
            // given
            component.recommendation.isAddedToPlan = false;

            // when
            const addToPlanElement = fixture.debugElement.query(By.css('.add-to-plan-column'));
            addToPlanElement.nativeElement.click();

            // then
            expect(component.recommendation.isAddedToPlan).toBeTruthy();
        });

        it('should remove recommendation from plan if already added to plan', () => {
            // given
            component.recommendation.isAddedToPlan = true;

            // when
            const addToPlanElement = fixture.debugElement.query(By.css('.add-to-plan-column'));
            addToPlanElement.nativeElement.click();

            // then
            expect(component.recommendation.isAddedToPlan).toBeFalsy();
        });
    });

    it('should display a linked grant name', () => {
        const grantNameElement = fixture.debugElement.query(By.css('.grant-name')).nativeElement;
        expect(grantNameElement.innerText).toBe(grant.name);
    });

    it('should display a linked grant description', () => {
        const grantDescriptionElement = fixture.debugElement.query(By.css('.grant-description')).nativeElement;
        expect(grantDescriptionElement.innerText).toBe(grant.description);
    });

    it('should display a the recommendation advantages', () => {
        const displayedAdvantages = fixture.debugElement.queryAll(By.css('.benefits-list-item'))
            .map(el => el.nativeElement.innerText.trim());
        expect(displayedAdvantages.length).toBe(advantages.length);
        advantages.forEach(expectedAdvantage => expect(displayedAdvantages).toContain(expectedAdvantage));
    });
});
