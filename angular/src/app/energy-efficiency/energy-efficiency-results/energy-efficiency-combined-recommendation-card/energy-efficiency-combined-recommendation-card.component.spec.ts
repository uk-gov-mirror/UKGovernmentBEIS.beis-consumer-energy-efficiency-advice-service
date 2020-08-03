import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';

import {EnergyEfficiencyCombinedRecommendationCardComponent} from './energy-efficiency-combined-recommendation-card.component';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {NationalGrantForMeasure} from '../../../grants/model/national-grant-for-measure';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

describe('EnergyEfficiencyCombinedRecommendationCardComponent', () => {
    let component: EnergyEfficiencyCombinedRecommendationCardComponent;
    let fixture: ComponentFixture<EnergyEfficiencyCombinedRecommendationCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyCombinedRecommendationCardComponent,
                DataCardComponent,
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
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
        fixture = TestBed.createComponent(EnergyEfficiencyCombinedRecommendationCardComponent);
        component = fixture.componentInstance;
        component.recommendations = getRecommendations();
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#toggleAddedToPlan', () => {
        it('should add recommendations to plan if not already added to plan', () => {
            // given
            setAddedToPlanForRecommendations(component.recommendations, false);

            // when
            const addToPlanElement = fixture.debugElement.query(By.css('.add-to-plan-column'));
            addToPlanElement.nativeElement.click();

            // then
            component.recommendations.forEach(recommendation => {
                expect(recommendation.isAddedToPlan).toBe(true);
            });
        });

        it('should remove recommendation from plan if already added to plan', () => {
            // given
            setAddedToPlanForRecommendations(component.recommendations, true);

            // when
            const addToPlanElement = fixture.debugElement.query(By.css('.add-to-plan-column'));
            addToPlanElement.nativeElement.click();

            // then
            component.recommendations.forEach(recommendation => {
                expect(recommendation.isAddedToPlan).toBe(false);
            });
        });
    });

    function getRecommendations(): EnergyEfficiencyRecommendation[] {
       const recommendation1 = getRecommendation();
       const recommendation2 = getRecommendation();

       return [recommendation1, recommendation2];
    }

    function getRecommendation(): EnergyEfficiencyRecommendation {
        return {
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
            grant: {} as NationalGrantForMeasure,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
            trustMarkTradeCodes: [],
        };
    }

    function setAddedToPlanForRecommendations(recommendations: EnergyEfficiencyRecommendation[], addedToPlan: boolean): void {
        recommendations.forEach(recommendation => {
            recommendation.isAddedToPlan = addedToPlan;
        });
    }
});
