// TODO-BOC
// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import {DownloadPlanComponent} from './download-plan.component';
// import {ResponseData} from '../../../shared/response-data/response-data';
// import {InlineSVGModule} from 'ng-inline-svg';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
// import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";
// import {FormsModule} from "@angular/forms";
// import {SpinnerAndErrorContainerComponent} from "../../../shared/spinner-and-error-container/spinner-and-error-container.component";
//
// describe('DownloadPlanComponent', () => {
//     let component: DownloadPlanComponent;
//     let fixture: ComponentFixture<DownloadPlanComponent>;
//
//     let responseData: ResponseData;
//
//     beforeEach(async(() => {
//         responseData = new ResponseData();
//
//         TestBed.configureTestingModule({
//             declarations: [
//                 DownloadPlanComponent,
//                 SpinnerAndErrorContainerComponent,
//             ],
//             providers: [
//                 {provide: ResponseData, useValue: responseData},
//                 GoogleAnalyticsService,
//                 {provide: RecommendationsService, useValue: {getRecommendationsInPlan: () => []}}
//             ],
//             imports: [
//                 InlineSVGModule,
//                 HttpClientTestingModule,
//                 RouterTestingModule,
//                 FormsModule,
//             ]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(DownloadPlanComponent);
//         component = fixture.componentInstance;
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
