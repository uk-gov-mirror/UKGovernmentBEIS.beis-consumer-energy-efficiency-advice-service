import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomePageComponent} from './home-page.component';
import {LatestNewsCardComponent} from '../shared/latest-news-card/latest-news-card.component';
import {ResponseData} from '../shared/response-data/response-data';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {Location} from '@angular/common';
import {NavigationBarComponent} from '../layout-components/navigation-bar/navigation-bar.component';
import {FormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {Observable} from 'rxjs/Observable';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {LatestNewsSectionComponent} from '../shared/latest-news-section/latest-news-section.component';
import {SearchBarComponent} from '../layout-components/search-bar/search-bar.component';
import {NavBarSuboptionComponent} from '../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component';
import {GoogleAnalyticsService} from '../shared/analytics/google-analytics.service';
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let responseDataStub: ResponseData;

    const pageTitleStub = {
        set: () => {}
    };

    class DummyComponent {
    }

    beforeEach(async(() => {
        responseDataStub = new ResponseData();
        TestBed.configureTestingModule({
            declarations: [HomePageComponent, LatestNewsSectionComponent,
                LatestNewsCardComponent, NavBarSuboptionComponent, NavigationBarComponent,
                SearchBarComponent, SpinnerAndErrorContainerComponent],
            imports: [RouterTestingModule.withRoutes([
                {path: 'energy-efficiency/results', component: DummyComponent},
                {path: 'grants', component: DummyComponent},
                {path: 'boiler', component: DummyComponent},
                {path: 'energy-efficiency/reduce-bills', component: DummyComponent},
                {path: 'energy-efficiency/warmer-home', component: DummyComponent},
                {path: 'energy-efficiency/home-improvements', component: DummyComponent},
                {path: 'energy-efficiency/greener-home', component: DummyComponent},
            ]), FormsModule, InlineSVGModule],
            providers: [
                {provide: ResponseData, useValue: responseDataStub},
                {
                    provide: WordpressPagesService,
                    useValue: {getLatestPages: () => Observable.of([])}
                },
                {provide: PageTitleService, useValue: pageTitleStub},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the user journey type and move to the reduce bills landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.reduce-bills', '/energy-efficiency/reduce-bills');
    });

    it('should set the user journey type and move to the warmer home landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.warmer-home', '/energy-efficiency/warmer-home');
    });

    it('should set the user journey type and move to the home improvements landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.home-improvements', '/energy-efficiency/home-improvements');
    });

    it('should set the user journey type and move to the greener home landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.greener-home', '/energy-efficiency/greener-home');
    });

    it('should redirect the "calculator" button to the "reduce-bills" landing page', async () => {
        checkLink('.calculator', '/energy-efficiency/reduce-bills', undefined);
    });

    it('should set the user journey type and move to the grants page when the appropriate button is clicked', async () => {
        checkLink('.grants', '/grants', UserJourneyType.Grants);
    });

    it('should set the user journey type and move to the boilers page when the appropriate button is clicked', async () => {
        checkLink('.boiler', '/boiler', UserJourneyType.Boiler);
    });

    const checkLink = (selector: string, path: string, journeyType?: UserJourneyType) => {
        // when
        const button = fixture.debugElement.query(By.css(selector));
        button.nativeElement.click();

        // then
        if (journeyType !== undefined) {
            expect(responseDataStub.userJourneyType).toBe(journeyType);
        }

        fixture.whenStable().then(() => {
            const location = TestBed.get(Location);
            expect(location.path()).toBe(path);
        });
    };
});
