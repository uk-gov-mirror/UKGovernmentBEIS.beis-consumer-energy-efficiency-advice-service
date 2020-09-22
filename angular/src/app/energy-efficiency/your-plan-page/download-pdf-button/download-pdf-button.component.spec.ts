import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DownloadPdfButtonComponent} from './download-pdf-button.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {InlineSVGModule} from 'ng-inline-svg';
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";
import {PlanInfoService} from "../../../shared/plan-info-service/plan-info.service";
import {GreenHomesGrantService} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";

describe('DownloadPdfButtonComponent', () => {
    let component: DownloadPdfButtonComponent;
    let fixture: ComponentFixture<DownloadPdfButtonComponent>;

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                DownloadPdfButtonComponent,
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                GoogleAnalyticsService,
                {provide: RecommendationsService, useValue: {}},
                PlanInfoService,
                GreenHomesGrantService
            ],
            imports: [
                InlineSVGModule,
                RouterTestingModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadPdfButtonComponent);
        component = fixture.componentInstance;
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});
