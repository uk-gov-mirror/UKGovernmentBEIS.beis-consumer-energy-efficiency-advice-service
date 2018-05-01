import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {EnergyEfficiencyRecommendation} from '../../../shared/recommendations-service/energy-efficiency-recommendation';
import {EnergyEfficiencyRecommendationTag} from '../recommendation-tags/energy-efficiency-recommendation-tag';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {YourPlanSummaryComponent} from '../../your-plan-summary/your-plan-summary.component';
import {RecommendationsService} from '../../../shared/recommendations-service/recommendations.service';
import {YourPlanFooterComponent} from './your-plan-footer.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';

describe('YourPlanFooterComponent', () => {
    let component: YourPlanFooterComponent;
    let fixture: ComponentFixture<YourPlanFooterComponent>;

    const recommendationsServiceStub = {
        getRecommendationsInPlan: () => []
    };

    const responseDataStub = {
        tenureType: TenureType.PrivateTenancy,
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                YourPlanFooterComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: ResponseData, useValue: responseDataStub},
            ],
            imports: [
                InlineSVGModule,
                HttpClientTestingModule
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
