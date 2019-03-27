import {YourPlanFooterCombinedItemComponent} from "./your-plan-footer-combined-item.component";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {EnergyEfficiencyRecommendation} from "../../../../shared/recommendations-service/energy-efficiency-recommendation";

describe('YourPlanFooterCombinedItemComponent', () => {
    let component: YourPlanFooterCombinedItemComponent;
    let fixture: ComponentFixture<YourPlanFooterCombinedItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanFooterCombinedItemComponent,
            ],
            providers: [],
            imports: [
                InlineSVGModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanFooterCombinedItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('#contruct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('#removeFromPlan', () => {
        it('should mark all recommendations as not added to plan', () => {
            // given
            component.recommendations = getAllRecommendations();

            // when
            component.removeFromPlan();

            // then
            component.recommendations.forEach(recommendation => {
                expect(recommendation.isAddedToPlan).toBe(false);
            });
        });
    });

    function getAllRecommendations(): EnergyEfficiencyRecommendation[] {
        const recommendation1 = {
            isAddedToPlan: true
        } as EnergyEfficiencyRecommendation;

        const recommendation2 = {
            isAddedToPlan: true
        } as EnergyEfficiencyRecommendation;

        return [recommendation1, recommendation2];
    }
});
