import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {YourPlanComponent} from "./your-plan.component";
import {EnergyEfficiencyRecommendation} from "../energy-efficiency-recommendation-card/energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {DataCardComponent} from "../data-card/data-card.component";

describe('YourPlanComponent', () => {
    let component: YourPlanComponent;
    let fixture: ComponentFixture<YourPlanComponent>;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            investmentPounds: 199,
            costSavingPoundsPerYear: 99,
            costSavingPoundsPerMonth: 99 / 12,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Loft insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grants: [],
            advantages: []
        },
        {
            investmentPounds: 999,
            costSavingPoundsPerYear: 200,
            costSavingPoundsPerMonth: 200 / 12,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm,
            grants: [],
            advantages: []
        },
        {
            investmentPounds: 20,
            costSavingPoundsPerYear: 10,
            costSavingPoundsPerMonth: 10 / 12,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconClassName: 'dummy-icon',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grants: [],
            advantages: []
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YourPlanComponent, DataCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanComponent);
        component = fixture.componentInstance;
        component.recommendations = recommendations;
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

    it('should calculate the total investment and round it correctly', () => {
        expect(component.getRoundedTotalInvestmentRequired()).toBe(1220);
    });

    it('should calculate the total monthly saving and round it correctly', () => {
        expect(component.getRoundedTotalSavingsPerMonth()).toBe(25);
    });
});