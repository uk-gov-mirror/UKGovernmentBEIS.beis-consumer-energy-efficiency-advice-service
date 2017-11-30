import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {YourPlanSummaryComponent} from "./your-plan-summary.component";
import {EnergyEfficiencyRecommendation} from "../../shared/recommendations-service/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {DataCardComponent} from "../data-card/data-card.component";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";

describe('YourPlanSummaryComponent', () => {
    let component: YourPlanSummaryComponent;
    let fixture: ComponentFixture<YourPlanSummaryComponent>;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            recommendationId: 'loft-insulation',
            investmentPounds: 199,
            costSavingPoundsPerYear: 99,
            costSavingPoundsPerMonth: 99 / 12,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Loft insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: []
        },
        {
            recommendationId: 'solar-photovolatic-panels',
            investmentPounds: 999,
            costSavingPoundsPerYear: 200,
            costSavingPoundsPerMonth: 200 / 12,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grant: null,
            advantages: [],
            steps: []
        },
        {
            recommendationId: 'cylinder-insulation',
            investmentPounds: 20,
            costSavingPoundsPerYear: 10,
            costSavingPoundsPerMonth: 10 / 12,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grant: null,
            advantages: [],
            steps: []
        }
    ];

    const recommendationsServiceStub = {
        getRecommendationsInPlan: () => recommendations
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanSummaryComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [{provide: RecommendationsService, useValue: recommendationsServiceStub}]
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
        expect(component.getRoundedTotalSavingsPerMonth()).toBe(25);
    });
});