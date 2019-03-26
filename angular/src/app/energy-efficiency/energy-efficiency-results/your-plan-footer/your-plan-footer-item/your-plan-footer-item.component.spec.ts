import {YourPlanFooterItemComponent} from "./your-plan-footer-item.component";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {EnergyEfficiencyRecommendation} from "../../../../shared/recommendations-service/energy-efficiency-recommendation";

describe('YourPlanFooterItemComponent', () => {
    let component: YourPlanFooterItemComponent;
    let fixture: ComponentFixture<YourPlanFooterItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanFooterItemComponent,
            ],
            providers: [],
            imports: [
                InlineSVGModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanFooterItemComponent);
        component = fixture.componentInstance;
        component.recommendation = getRecommendation();
        fixture.detectChanges();
    });

    describe('#contruct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#removeFromPlan', () => {
        it('should mark recommendation as not added to plan', () => {
            // When
            component.removeFromPlan();

            // Then
            expect(component.recommendation.isAddedToPlan).toBe(false);
        });
    });

    function getRecommendation(): EnergyEfficiencyRecommendation {
        return {
            headline: 'test headline',
            isAddedToPlan: true
        } as EnergyEfficiencyRecommendation;
    }
});
