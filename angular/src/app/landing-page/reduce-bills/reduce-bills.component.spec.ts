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

describe('ReduceBillsComponent', () => {
    let component: ReduceBillsComponent;
    let fixture: ComponentFixture<ReduceBillsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReduceBillsComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent,
                QuestionReasonComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}}
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
