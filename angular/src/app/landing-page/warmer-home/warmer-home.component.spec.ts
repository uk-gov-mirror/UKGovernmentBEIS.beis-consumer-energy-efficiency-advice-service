import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {WarmerHomeComponent} from "./warmer-home.component";
import {ArticleCardComponent} from "../article-card/article-card.component";
import {LatestNewsCardComponent} from "../../shared/latest-news-card/latest-news-card.component";
import {LargeVideoCardComponent} from "../large-video-card/large-video-card.component";
import {LandingPageComponent} from "../landing-page.component";
import {NavigationBarComponent} from "../../layout-components/navigation-bar/navigation-bar.component";
import {ResponseData} from "../../shared/response-data/response-data";
import {PostcodeValidationService} from "../../shared/postcode-validation-service/postcode-validation.service";

describe('WarmerHomeComponent', () => {
    let component: WarmerHomeComponent;
    let fixture: ComponentFixture<WarmerHomeComponent>;

    class MockRouter {
    }

    const VALID_POSTCODE = 'PO57 C03';
    const mockPostcodeValidator = (postcode: string) => postcode === VALID_POSTCODE;
    const postcodeValidationServiceStub = {
        isValid: jasmine.createSpy('isValid').and.callFake(mockPostcodeValidator)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WarmerHomeComponent,
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
        fixture = TestBed.createComponent(WarmerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
