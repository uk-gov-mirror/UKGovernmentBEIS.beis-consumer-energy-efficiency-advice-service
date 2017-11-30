import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable"

import {CarbonFootprintComponent} from "./carbon-footprint.component";
import {LargeVideoCardComponent} from "../../shared/large-video-card/large-video-card.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../layout-components/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {QuestionContentService} from "../../shared/question-content/question-content.service";
import {QuestionReasonComponent} from "../../shared/question-reason/question-reason.component";
import {PostcodeLookupComponent} from "../../shared/postcode-lookup/postcode-lookup.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";
import {WordpressPagesService} from "../../shared/wordpress-pages-service/wordpress-pages.service";

describe('CarbonFootprintComponent', () => {

    let component: CarbonFootprintComponent;
    let fixture: ComponentFixture<CarbonFootprintComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CarbonFootprintComponent,
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
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarbonFootprintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
