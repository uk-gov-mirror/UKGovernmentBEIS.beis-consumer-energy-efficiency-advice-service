import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {ReduceBillsComponent} from "./reduce-bills.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../layout-components/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {QuestionReasonComponent} from "../../shared/question-reason/question-reason.component";
import {QuestionContentService} from "../../shared/question-content/question-content.service";
import {PostcodeLookupComponent} from "../../shared/postcode-lookup/postcode-lookup.component";
import {EpcParserService} from "../../shared/postcode-epc-service/epc-api-service/epc-parser.service";
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";


describe('ReduceBillsComponent', () => {
    let component: ReduceBillsComponent;
    let fixture: ComponentFixture<ReduceBillsComponent>;

    const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');
    const dummyPostcodeDetails: PostcodeDetails = {
        postcode: 'dummy',
        allEpcsForPostcode: EpcParserService.parse(dummyEpcsResponse),
        localAuthorityCode: null
    };
    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(dummyPostcodeDetails)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReduceBillsComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent,
                QuestionReasonComponent,
                PostcodeLookupComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReduceBillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
