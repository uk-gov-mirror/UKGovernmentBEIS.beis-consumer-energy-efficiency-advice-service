import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

import {RecommendationCardComponent} from "./recommendation-card.component";
import {EnergySavingMeasure} from "./energy-saving-recommendation";

describe('RecommendationCardComponent', () => {
    let component: RecommendationCardComponent;
    let fixture: ComponentFixture<RecommendationCardComponent>;

    const recommendation: EnergySavingMeasure = {
        investmentPounds: 200,
        costSavingPoundsPerYear: 100,
        energySavingKwhPerYear: 100,
        readMoreRoute: ('home-improvements/loft-insulation'),
        iconClassName: 'icon-roofing',
        headline: 'Loft insulation',
        summary: 'No description available'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendationCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationCardComponent);
        component = fixture.componentInstance;
        component.recommendation = recommendation;
        fixture.detectChanges();
    });

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

    it('should display the correct icon', () => {
        const iconElement = fixture.debugElement.query(By.css('.icon')).nativeElement;
        expect(iconElement.classList).toContain(recommendation.iconClassName);
    });

    it('should display the correct investment amount', () => {
        const investmentElement = fixture.debugElement.query(By.css('.investment .box-content')).nativeElement;
        expect(investmentElement.innerText).toEqual(`£${recommendation.investmentPounds}`);
    });

    it('should display the correct savings amount', () => {
        const savingsElement = fixture.debugElement.query(By.css('.savings .box-content')).nativeElement;
        expect(savingsElement.innerText).toEqual(`£${recommendation.costSavingPoundsPerYear.toFixed(2)}`);
    });
});
