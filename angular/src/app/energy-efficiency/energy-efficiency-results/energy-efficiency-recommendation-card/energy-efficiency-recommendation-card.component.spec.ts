import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

import {EnergyEfficiencyRecommendationCardComponent} from "./energy-efficiency-recommendation-card.component";
import {DataCardComponent} from "../data-card/data-card.component";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {EnergyEfficiencyRecommendationTag} from "./energy-efficiency-recommendation-tag";

describe('EnergyEfficiencyRecommendationCardComponent', () => {
    let component: EnergyEfficiencyRecommendationCardComponent;
    let fixture: ComponentFixture<EnergyEfficiencyRecommendationCardComponent>;

    const recommendation: EnergyEfficiencyRecommendation = {
        investmentPounds: 200,
        costSavingPoundsPerYear: 100,
        energySavingKwhPerYear: 100,
        readMoreRoute: ('home-improvements/loft-insulation'),
        iconClassName: 'icon-roofing',
        headline: 'Loft insulation',
        summary: 'No description available',
        tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyRecommendationCardComponent,
                DataCardComponent
            ],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyRecommendationCardComponent);
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

    it('should display the correct tags', () => {
        // given
        const tagsElements = fixture.debugElement.queryAll(By.css('.tag'));

        // then
        expect(tagsElements.length).toBe(2);
        const tagNames = tagsElements.map(element => element.nativeElement.innerText.toLowerCase());
        expect(tagNames).toContain('grant');
        expect(tagNames).toContain('longer term');
    });
});