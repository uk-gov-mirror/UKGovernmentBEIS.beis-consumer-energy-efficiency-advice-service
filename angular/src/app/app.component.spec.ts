import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./layout-components/header/header.component";
import {FooterComponent} from "./layout-components/footer/footer.component";
import {ComponentFixture} from "@angular/core/testing";
import {NavigationBarComponent} from "./layout-components/navigation-bar/navigation-bar.component";
import {WordpressPagesService} from "./shared/wordpress-pages-service/wordpress-pages.service";
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";
import {SVGCacheService} from "ng-inline-svg";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OneTimePopupComponent} from "./layout-components/one-time-popup/one-time-popup.component";
import {PopupComponent} from "./shared/popup/popup.component";
import {CookieService} from "ng2-cookies";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    const mockWordpressPagesService = {getTopLevelPages: () => Observable.of([])};

    const mockCookieService = {
        check: () => {},
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent,
                NavigationBarComponent,
                OneTimePopupComponent,
                PopupComponent,
            ],
            imports: [RouterTestingModule, FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                GoogleAnalyticsService,
                {provide: SVGCacheService, useValue: {setBaseUrl: () => {}}},
                {provide: CookieService, useValue: mockCookieService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(app).toBeTruthy();
    }));
});
