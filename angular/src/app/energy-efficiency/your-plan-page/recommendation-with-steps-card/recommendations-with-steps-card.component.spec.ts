import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {RecommendationWithStepsCardComponent} from './recommendation-with-steps-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {RecommendationStepCardComponent} from "../recommendation-step-card/recommendation-step-card.component";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";

describe('RecommendationWithStepsCardComponent', () => {
    let component: RecommendationWithStepsCardComponent;
    let fixture: ComponentFixture<RecommendationWithStepsCardComponent>;

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                RecommendationWithStepsCardComponent,
                DataCardComponent,
                RecommendationStepCardComponent,
                DataCardComponent,
                // YourPlanSummaryComponent
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                GoogleAnalyticsService
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationWithStepsCardComponent);
        component = fixture.componentInstance;
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});