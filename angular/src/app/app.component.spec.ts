import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout-components/header/header.component';
import {FooterComponent} from './layout-components/footer/footer.component';
import {NavigationBarComponent} from './layout-components/navigation-bar/navigation-bar.component';
import {WordpressPagesService} from './shared/wordpress-pages-service/wordpress-pages.service';
import {GoogleAnalyticsService} from './shared/analytics/google-analytics.service';
import {InlineSVGModule, SVGCacheService} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PopupComponent} from './shared/popup/popup.component';
import {CookieService} from 'ng2-cookies';
import {WordpressMeasuresService} from './shared/wordpress-measures-service/wordpress-measures.service';
import {NavBarSuboptionComponent} from './layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component';
import {UserStateService} from './shared/user-state-service/user-state-service';
import {NeedHelpComponent} from './shared/need-help/need-help.component';
import {SearchBarComponent} from './layout-components/search-bar/search-bar.component';
import {RecommendationsService} from './shared/recommendations-service/recommendations.service';
import {WordpressSearchService} from './shared/wordpress-search-service/wordpress-search.service';
import {SpinnerAndErrorContainerComponent} from "./shared/spinner-and-error-container/spinner-and-error-container.component";

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
                PopupComponent,
                NavBarSuboptionComponent,
                NeedHelpComponent,
                SearchBarComponent,
                SpinnerAndErrorContainerComponent
            ],
            imports: [RouterTestingModule, FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: WordpressMeasuresService, useValue: {}},
                {provide: WordpressSearchService, useValue: {}},
                GoogleAnalyticsService,
                {provide: SVGCacheService, useValue: {setBaseUrl: () => {}}},
                {provide: CookieService, useValue: mockCookieService},
                {provide: UserStateService, useValue: mockUserStateService},
                {provide: RecommendationsService, useValue: {}},
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
