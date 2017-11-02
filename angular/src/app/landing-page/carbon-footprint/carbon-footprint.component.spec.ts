import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {CarbonFootprintComponent} from "./carbon-footprint.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../layout-components/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeValidationService} from "../../shared/postcode-validation-service/postcode-validation.service";

describe('CarbonFootprintComponent', () => {

    let component: CarbonFootprintComponent;
    let fixture: ComponentFixture<CarbonFootprintComponent>;

    class MockRouter {
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CarbonFootprintComponent,
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
        fixture = TestBed.createComponent(CarbonFootprintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
