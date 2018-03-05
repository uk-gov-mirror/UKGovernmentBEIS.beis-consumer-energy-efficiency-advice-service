import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {YourPlanPageComponent} from './your-plan-page.component';
import {Observable} from 'rxjs/Observable';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {YourPlanSummaryComponent} from '../your-plan-summary/your-plan-summary.component';
import {RecommendationStepCardComponent} from './recommendation-step-card/recommendation-step-card.component';
import {GrantCardComponent} from '../../shared/grant-card/grant-card.component';
import {DownloadPlanComponent} from './download-plan/download-plan.component';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {GrantEligibility} from '../../grants/grant-eligibility-service/grant-eligibility';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {ResponseData} from '../../shared/response-data/response-data';
import {StickyRowWrapperComponent} from '../../shared/sticky-row-wrapper/sticky-row-wrapper.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';

describe('YourPlanPageComponent', () => {
    let component: YourPlanPageComponent;
    let fixture: ComponentFixture<YourPlanPageComponent>;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            investmentPounds: 199,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 99,
            costSavingPoundsPerMonth: 99 / 12,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Loft insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [{
                headline: 'Step One',
                description: 'Step one description',
                moreInfoLinks: []
            }, {
                headline: 'Step Two',
                description: 'Step two description',
                moreInfoLinks: []
            }
            ],
            isAddedToPlan: false
        },
        {
            investmentPounds: 999,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 200,
            costSavingPoundsPerMonth: 200 / 12,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [],
            isAddedToPlan: false
        },
        {
            investmentPounds: 20,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 10,
            costSavingPoundsPerMonth: 10 / 12,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grant: null,
            advantages: [],
            steps: [],
            isAddedToPlan: false
        }
    ];

    const localAuthorityCode = 'E09000033';

    const localAuthorityGrants: LocalAuthorityGrant[] = [
        {
            grantId: 'grant-1',
            name: 'Grant 1',
            description: 'some grant',
            eligibility: GrantEligibility.MayBeEligible,
            steps: []
        },
        {
            grantId: 'grant-1',
            name: 'Grant 2',
            description: 'another grant',
            eligibility: GrantEligibility.MayBeEligible,
            steps: []
        }
    ];

    let localAuthorityResponse: Observable<LocalAuthority>;
    const localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    const recommendationsServiceStub = {
        getRecommendationsInPlan: () => recommendations
    };

    beforeEach(async(() => {
        localAuthorityResponse = Observable.of({
            name: 'Westminster',
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: localAuthorityGrants
        });

        spyOn(localAuthorityServiceStub, 'fetchLocalAuthorityDetails').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                YourPlanPageComponent,
                YourPlanSummaryComponent,
                RecommendationStepCardComponent,
                GrantCardComponent,
                DownloadPlanComponent,
                DataCardComponent,
                StickyRowWrapperComponent
            ],
            providers: [
                {provide: ResponseData, useValue: {localAuthorityCode: localAuthorityCode}},
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub}
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the local authority service with the correct local authority code', () => {
        expect(localAuthorityServiceStub.fetchLocalAuthorityDetails).toHaveBeenCalledWith(localAuthorityCode);
    });

    it('should display all recommendations correctly', () => {
        // given
        const displayedRecommendationHeadlines = fixture.debugElement.queryAll(By.css('.recommendation-steps-card .headline'))
            .map(el => el.nativeElement.innerText);
        const expectedRecommendationHeadlines = recommendations.map(rec => rec.headline);

        // then
        expect(displayedRecommendationHeadlines.length).toBe(recommendations.length);
        expectedRecommendationHeadlines
            .forEach(expectedHeadline => expect(displayedRecommendationHeadlines).toContain(expectedHeadline));
    });

    it('should display the local authority name', async(() => {
        fixture.whenStable().then(() => {
            const localAuthorityNameElement = fixture.debugElement.query(By.css('.local-authority')).nativeElement;
            expect(localAuthorityNameElement.innerText).toContain('Westminster');
        });
    }));

    it('should display all local authority grants returned', async(() => {
        fixture.whenStable().then(() => {
            const grantsCards = fixture.debugElement.queryAll(By.directive(GrantCardComponent));
            expect(grantsCards.length).toEqual(2);
        });
    }));
});
