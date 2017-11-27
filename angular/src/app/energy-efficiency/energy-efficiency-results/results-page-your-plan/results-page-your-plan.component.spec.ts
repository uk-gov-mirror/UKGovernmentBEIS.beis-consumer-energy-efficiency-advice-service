import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {EnergyEfficiencyRecommendation} from "../../recommendations/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {DataCardComponent} from "../../data-card/data-card.component";
import {ResultsPageYourPlanComponent} from "./results-page-your-plan.component";
import {YourPlanSummaryComponent} from "../../your-plan-summary/your-plan-summary.component";
import {ResponseData} from "../../../shared/response-data/response-data";

describe('ResultsPageYourPlanComponent', () => {
    let component: ResultsPageYourPlanComponent;
    let fixture: ComponentFixture<ResultsPageYourPlanComponent>;

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
                ResultsPageYourPlanComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsPageYourPlanComponent);
        component = fixture.componentInstance;
        responseData.energyEfficiencyRecommendationsInPlan = recommendations;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct recommendations', () => {
        const recommendationHeadlines = fixture.debugElement.queryAll(By.css('.recommendations-list-item'))
            .map(el => el.nativeElement.innerText);
        expect(recommendationHeadlines.length).toEqual(recommendations.length);
        recommendations.forEach(expectedRecommendation =>
            expect(recommendationHeadlines).toContain(expectedRecommendation.headline));
    });
});