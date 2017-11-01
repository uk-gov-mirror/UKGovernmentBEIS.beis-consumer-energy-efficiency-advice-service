import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {HomeImprovementsComponent} from "./home-improvements.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {LatestNewsCardComponent} from "../../common/latest-news-card/latest-news-card.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../common/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../common/response-data/response-data";
import {PostcodeValidationService} from "../../common/postcode-validation-service/postcode-validation.service";

describe('HomeImprovementsComponent', () => {
    let component: HomeImprovementsComponent;
    let fixture: ComponentFixture<HomeImprovementsComponent>;

    class MockRouter {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeImprovementsComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
            ],
            providers: [
                ResponseData,
                PostcodeValidationService,
                {provide: Router, useClass: MockRouter}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeImprovementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
