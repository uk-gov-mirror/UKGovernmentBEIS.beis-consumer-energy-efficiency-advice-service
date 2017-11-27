import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {YourPlanSummaryComponent} from "./your-plan-summary.component";
import {EnergyEfficiencyRecommendation} from "../recommendations/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "../energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {ResponseData} from "../../shared/response-data/response-data";
import {DataCardComponent} from "../data-card/data-card.component";

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

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                YourPlanSummaryComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanSummaryComponent);
        component = fixture.componentInstance;
        responseData.energyEfficiencyRecommendationsInPlan = recommendations;
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