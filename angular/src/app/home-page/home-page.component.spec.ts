import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HomePageComponent} from './home-page.component';
import {LatestNewsCardComponent} from '../shared/latest-news-card/latest-news-card.component';
import {ResponseData} from '../shared/response-data/response-data';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {Location} from '@angular/common';
import {NavigationBarComponent} from '../layout-components/navigation-bar/navigation-bar.component';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {Observable} from 'rxjs/Observable';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {LatestNewsSectionComponent} from '../shared/latest-news-section/latest-news-section.component';
import {NavBarSuboptionComponent} from "../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component";

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    let responseDataStub: ResponseData;
    let questionnaireComplete: boolean;

    class DummyComponent {
    }

    beforeEach(async(() => {
        responseDataStub = new ResponseData();
        TestBed.configureTestingModule({
            declarations: [HomePageComponent, LatestNewsSectionComponent, LatestNewsCardComponent, NavigationBarComponent,
                NavBarSuboptionComponent],
            imports: [RouterTestingModule.withRoutes([
                {path: 'js/energy-efficiency/questionnaire/home-basics', component: DummyComponent},
                {path: 'js/energy-efficiency/results', component: DummyComponent},
                {path: 'js/grants', component: DummyComponent},
                {path: 'js/boiler', component: DummyComponent},
                {path: 'js/reduce-bills', component: DummyComponent},
                {path: 'js/warmer-home', component: DummyComponent},
                {path: 'js/home-improvements', component: DummyComponent},
                {path: 'js/greener-home', component: DummyComponent}
            ])],
            providers: [
                {provide: ResponseData, useValue: responseDataStub},
                {
                    provide: QuestionnaireService,
                    useValue: {isComplete: () => questionnaireComplete}
                },
                {
                    provide: WordpressPagesService,
                    useValue: {getLatestPages: () => Observable.of([])}
                }]
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
        checkLink('.landing-page-link.reduce-bills', '/js/reduce-bills');
    });

    it('should set the user journey type and move to the warmer home landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.warmer-home', '/js/warmer-home');
    });

    it('should set the user journey type and move to the home improvements landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.home-improvements', '/js/home-improvements');
    });

    it('should set the user journey type and move to the greener home landing page when the link is clicked', async () => {
        checkLink('.landing-page-link.greener-home', '/js/greener-home');
    });

    it('should set the user journey type and move to the questionnaire when the appropriate button is clicked, if questionnaire incomplete',
    async () => {
        // given
        questionnaireComplete = false;

        checkLink('.calculator', '/js/energy-efficiency/questionnaire/home-basics', UserJourneyType.Calculator);
    });

    it('should set the user journey type and move to the results page when the appropriate button is clicked, if questionnaire complete',
    async () => {
        // given
        questionnaireComplete = true;

        checkLink('.calculator', '/js/energy-efficiency/results', UserJourneyType.Calculator);
    });

    it('should set the user journey type and move to the grants page when the appropriate button is clicked', async () => {
        checkLink('.grants', '/js/grants', UserJourneyType.Grants);
    });

    it('should set the user journey type and move to the boilers page when the appropriate button is clicked', async () => {
        checkLink('.boiler', '/js/boiler', UserJourneyType.Boiler);
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
