import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

import {RecommendationCardComponent} from "./recommendation-card.component";
import {EnergySavingRecommendation} from "./energy-saving-recommendation";

describe('RecommendationCardComponent', () => {
    let component: RecommendationCardComponent;
    let fixture: ComponentFixture<RecommendationCardComponent>;

    const recommendation: EnergySavingRecommendation = {
        costSavingPoundsPerYear: 100,
        energySavingKwhPerYear: 100,
        readMorePath: 'home-improvements/loft-insulation',
        iconClassName: 'icon-roofing',
        headline: 'Loft insulation'
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

    it('should display the correct description', () => {
        const recommendationDescriptionElement = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(recommendationDescriptionElement.innerText).toBe(recommendation.headline);
    });

    it('should display the correct icon', () => {
        const iconElement = fixture.debugElement.query(By.css('.icon')).nativeElement;
        expect(iconElement.classList).toContain(recommendation.iconClassName);
    });
});
