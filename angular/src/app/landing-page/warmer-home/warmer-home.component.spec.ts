import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs/Observable";

import {WarmerHomeComponent} from "./warmer-home.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {LargeVideoCardComponent} from "../../shared/large-video-card/large-video-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../layout-components/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeLookupComponent} from "../../shared/postcode-lookup/postcode-lookup.component";
import {QuestionReasonComponent} from "../../shared/question-reason/question-reason.component";
import {QuestionContentService} from "../../shared/question-content/question-content.service";
import {PostcodeEpcService} from "../../shared/postcode-epc-service/postcode-epc.service";

describe('WarmerHomeComponent', () => {
    let component: WarmerHomeComponent;
    let fixture: ComponentFixture<WarmerHomeComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WarmerHomeComponent,
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
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarmerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
