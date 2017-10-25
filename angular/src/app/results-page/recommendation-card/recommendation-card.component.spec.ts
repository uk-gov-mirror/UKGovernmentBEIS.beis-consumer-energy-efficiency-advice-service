import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecommendationCardComponent} from './recommendation-card.component';
import {EnergySavingRecommendation} from './energy-saving-recommendation';
import {RecommendationType} from './recommendation-type.service';

describe('RecommendationCardComponent', () => {
    let component: RecommendationCardComponent;
    let fixture: ComponentFixture<RecommendationCardComponent>;

    const recommendation: EnergySavingRecommendation = {
        recommendationTypeCode: 'A',
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
});
