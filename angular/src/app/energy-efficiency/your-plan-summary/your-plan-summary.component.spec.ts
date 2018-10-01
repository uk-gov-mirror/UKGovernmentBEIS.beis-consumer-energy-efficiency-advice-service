import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {YourPlanSummaryComponent} from './your-plan-summary.component';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {ResponseData} from '../../shared/response-data/response-data';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';

describe('YourPlanSummaryComponent', () => {
    let component: YourPlanSummaryComponent;
    let fixture: ComponentFixture<YourPlanSummaryComponent>;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            investmentPounds: 199,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 99,
            minimumCostSavingPoundsPerYear: 89,
            maximumCostSavingPoundsPerYear: 109,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Loft insulation',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
        },
        {
            investmentPounds: 999,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 200,
            minimumCostSavingPoundsPerYear: 180,
            maximumCostSavingPoundsPerYear: 220,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
        },
        {
            investmentPounds: 20,
            lifetimeYears: 40,
            costSavingPoundsPerYear: 10,
            minimumCostSavingPoundsPerYear: 9,
            maximumCostSavingPoundsPerYear: 11,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
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
                YourPlanSummaryComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: ResponseData, useValue: responseDataStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate the total investment and round it correctly', () => {
        expect(component.getRoundedTotalInvestmentRequired()).toBe(1220);
    });

    it('should calculate the total monthly saving and round it correctly', () => {
        expect(component.totalSavingsDisplay).toBe('£25 - £30');
    });
});
