import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {ReduceBillsComponent} from "./reduce-bills.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../shared/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeValidationService} from "../../shared/postcode-validation-service/postcode-validation.service";

describe('ReduceBillsComponent', () => {
    let component: ReduceBillsComponent;
    let fixture: ComponentFixture<ReduceBillsComponent>;

    class MockRouter {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ReduceBillsComponent,
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
        fixture = TestBed.createComponent(ReduceBillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
