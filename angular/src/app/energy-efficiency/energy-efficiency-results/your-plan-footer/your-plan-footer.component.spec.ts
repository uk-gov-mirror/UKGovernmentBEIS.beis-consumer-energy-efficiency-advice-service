import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {YourPlanSummaryComponent} from '../../your-plan-summary/your-plan-summary.component';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {YourPlanFooterComponent} from './your-plan-footer.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';

describe('YourPlanFooterComponent', () => {
    let component: YourPlanFooterComponent;
    let fixture: ComponentFixture<YourPlanFooterComponent>;

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
            steps: [],
            isAddedToPlan: false,
            recommendationID: ''
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
            isAddedToPlan: false,
            recommendationID: ''
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
            isAddedToPlan: false,
            recommendationID: ''
        }
    ];

    const recommendationsServiceStub = {
        getRecommendationsInPlan: () => recommendations
    };

    const responseDataStub = {
        tenureType: TenureType.PrivateTenancy,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanFooterComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: ResponseData, useValue: responseDataStub},
            ],
            imports: [
                InlineSVGModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct recommendations', () => {
        const recommendationHeadlines = fixture.debugElement.queryAll(By.css('.recommendation-name'))
            .map(el => el.nativeElement.innerText);
        expect(recommendationHeadlines.length).toEqual(recommendations.length);
        recommendations.forEach(expectedRecommendation =>
            expect(recommendationHeadlines).toContain(expectedRecommendation.headline));
    });
});
