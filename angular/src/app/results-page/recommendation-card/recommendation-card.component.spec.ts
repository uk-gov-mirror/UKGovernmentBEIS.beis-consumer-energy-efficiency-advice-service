import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {RecommendationCardComponent} from "./recommendation-card.component";
import {EnergySavingRecommendation} from "./energy-saving-recommendation";

describe('RecommendationCardComponent', () => {
    let component: RecommendationCardComponent;
    let fixture: ComponentFixture<RecommendationCardComponent>;

    const recommendation: EnergySavingRecommendation = {
        recommendationType: {
            iconClassName: 'icon-roofing',
            description: 'Loft insulation'
        },
        costSavingPoundsPerYear: 100,
        energySavingKwhPerYear: 100
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendationCardComponent]
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
        expect(recommendationDescriptionElement.innerText).toBe(recommendation.recommendationType.description);
    });

    it('should display the correct icon', () => {
        const iconElement = fixture.debugElement.query(By.css('.icon')).nativeElement;
        expect(iconElement.classList).toContain(recommendation.recommendationType.iconClassName);
    });
});
