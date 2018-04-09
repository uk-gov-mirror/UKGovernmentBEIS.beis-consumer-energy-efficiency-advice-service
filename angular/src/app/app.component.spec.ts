import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout-components/header/header.component';
import {FooterComponent} from './layout-components/footer/footer.component';
import {ComponentFixture} from '@angular/core/testing';
import {NavigationBarComponent} from './layout-components/navigation-bar/navigation-bar.component';
import {WordpressPagesService} from './shared/wordpress-pages-service/wordpress-pages.service';
import {GoogleAnalyticsService} from './shared/analytics/google-analytics.service';
import {SVGCacheService} from 'ng-inline-svg';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OneTimePopupComponent} from './layout-components/one-time-popup/one-time-popup.component';
import {PopupComponent} from './shared/popup/popup.component';
import {CookieService} from 'ng2-cookies';
import {WordpressMeasuresService} from './shared/wordpress-measures-service/wordpress-measures.service';
import {NavBarSuboptionComponent} from "./layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component";
import {UserStateService} from "./shared/user-state-service/user-state-service";
import {NeedHelpComponent} from "./shared/need-help/need-help.component";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    const mockWordpressPagesService = {getTopLevelPages: () => Observable.of([])};
    const mockUserStateService = {getSessionReference: () => "reference"};

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
                NavBarSuboptionComponent,
                NeedHelpComponent,
            ],
            imports: [RouterTestingModule, FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: WordpressMeasuresService, useValue: {}},
                GoogleAnalyticsService,
                {provide: SVGCacheService, useValue: {setBaseUrl: () => {}}},
                {provide: CookieService, useValue: mockCookieService},
                {provide: UserStateService, useValue: mockUserStateService},
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
