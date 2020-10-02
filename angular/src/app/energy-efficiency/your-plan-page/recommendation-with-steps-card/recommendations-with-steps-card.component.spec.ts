import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {RecommendationWithStepsCardComponent} from './recommendation-with-steps-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {RecommendationStepCardComponent} from "../recommendation-step-card/recommendation-step-card.component";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {InstallerSearchService} from "../../../shared/installer-search-service/installer-search.service";
import {Observable} from '../../../../../node_modules/rxjs/Observable';
import {GreenHomesGrantService} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import {GreenHomesGrantEligibility} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant-eligibility";
import {By} from '@angular/platform-browser';
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {InstallationCost} from "../../../shared/recommendations-service/installation-cost";
import {NationalGrantForMeasure} from "../../../grants/model/national-grant-for-measure";
import {GrantEligibility} from "../../../grants/grant-eligibility-service/grant-eligibility";

describe('RecommendationWithStepsCardComponent', () => {
    let component: RecommendationWithStepsCardComponent;
    let fixture: ComponentFixture<RecommendationWithStepsCardComponent>;

    let responseData: ResponseData;

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
        tags: [
            EnergyEfficiencyRecommendationTag.LongerTerm,
            EnergyEfficiencyRecommendationTag.Grant,
            EnergyEfficiencyRecommendationTag.GHGPrimary
        ],
        grant: grant,
        advantages: advantages,
        steps: [],
        measureCode: '',
        isAddedToPlan: false,
        recommendationID: '',
        isMeasure: true,
        trustMarkTradeCodes: [],
        installationCost: new InstallationCost(100, 300, true)
    };

    beforeEach(async(() => {
        responseData = new ResponseData();
        responseData.postcode = "NW5 1TL";

        const installerSearchServiceStub = {
            fetchInstallerDetails: () => Observable.of({}),
        };

        const greenHomesGrantStub = {
            getEligibility: () => Observable.of(GreenHomesGrantEligibility.PartiallyEligible),
        };

        TestBed.configureTestingModule({
            declarations: [
                RecommendationWithStepsCardComponent,
                DataCardComponent,
                RecommendationStepCardComponent,
                DataCardComponent,
                // YourPlanSummaryComponent
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: InstallerSearchService, useValue: installerSearchServiceStub},
                {provide: GreenHomesGrantService, useValue: greenHomesGrantStub},
                GoogleAnalyticsService,
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationWithStepsCardComponent);
        component = fixture.componentInstance;
        component.recommendation = recommendation;
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should display the GHG tag', () => {
            const tagsElements = fixture.debugElement.queryAll(By.css('.tag'));

            expect(tagsElements.length).toBe(1);
            const tagNames = tagsElements.map(element => element.nativeElement.innerText.toLowerCase());
            expect(tagNames).toContain('ghg eligible (primary)');
        });

        it('should not display GHG tags if not eligible', () => {
            component.shouldShowGhgContext = false;
            component.ngOnInit();
            fixture.detectChanges();

            const tagsElements = fixture.debugElement.queryAll(By.css('.tag'));
            expect(tagsElements.length).toBe(0);
        });
    });
});
