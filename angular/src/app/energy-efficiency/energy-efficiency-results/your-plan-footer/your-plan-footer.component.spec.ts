import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {YourPlanSummaryComponent} from '../../your-plan-summary/your-plan-summary.component';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {YourPlanFooterComponent} from './your-plan-footer.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import {AbTestingService} from '../../../shared/analytics/ab-testing.service';
import {GoogleAnalyticsService} from '../../../shared/analytics/google-analytics.service';
import {YourPlanFooterItemComponent} from "./your-plan-footer-item/your-plan-footer-item.component";
import {YourPlanFooterCombinedItemComponent} from "./your-plan-footer-combined-item/your-plan-footer-combined-item.component";
import {EnergyEfficiencyDisplayService} from "../../../shared/energy-efficiency-display-service/energy-efficiency-display.service";

describe('YourPlanFooterComponent', () => {
    let component: YourPlanFooterComponent;
    let fixture: ComponentFixture<YourPlanFooterComponent>;

    const recommendationsServiceStub = {
        getRecommendationsInPlan: () => [],
        getUserRecommendationsInPlan: () => [],
        getLandlordRecommendationsInPlan: () => []
    };

    const responseDataStub = {
        tenureType: TenureType.PrivateTenancy,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanFooterComponent,
                DataCardComponent,
                YourPlanSummaryComponent,
                YourPlanFooterItemComponent,
                YourPlanFooterCombinedItemComponent,
            ],
            providers: [
                AbTestingService,
                GoogleAnalyticsService,
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: ResponseData, useValue: responseDataStub},
                EnergyEfficiencyDisplayService,
            ],
            imports: [
                InlineSVGModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourPlanFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
