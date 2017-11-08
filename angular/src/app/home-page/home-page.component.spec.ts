import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HomePageComponent} from "./home-page.component";
import {LatestNewsCardComponent} from "../shared/latest-news-card/latest-news-card.component";
import {ResponseData} from "../shared/response-data/response-data";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {Location} from "@angular/common";
import {NavigationBarComponent} from "../layout-components/navigation-bar/navigation-bar.component";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";

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
            declarations: [HomePageComponent, LatestNewsCardComponent, NavigationBarComponent],
            imports: [RouterTestingModule.withRoutes([
                {path: 'js/questionnaire/home-basics', component: DummyComponent},
                {path: 'js/results', component: DummyComponent}
            ])],
            providers: [
                {provide: ResponseData, useValue: responseDataStub},
                {
                    provide: QuestionnaireService,
                    useValue: {isComplete: () => questionnaireComplete}
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

    it('should set the user journey type and move to the questionnaire when the appropriate button is clicked, if questionnaire incomplete', async () => {
        // given
        questionnaireComplete = false;

        // when
        const button = fixture.debugElement.query(By.css('.calculator-button'));
        button.nativeElement.click();

        // then
        expect(responseDataStub.userJourneyType).toBe(UserJourneyType.HomepageLink);
        fixture.whenStable().then(() => {
            const location = fixture.debugElement.injector.get(Location);
            expect(location.path()).toBe('/js/questionnaire/home-basics');
        });
    });

    it('should set the user journey type and move to the results page when the appropriate button is clicked, if questionnaire complete', async () => {
        // given
        questionnaireComplete = true;

        // when
        const button = fixture.debugElement.query(By.css('.calculator-button'));
        button.nativeElement.click();

        // then
        expect(responseDataStub.userJourneyType).toBe(UserJourneyType.HomepageLink);
        fixture.whenStable().then(() => {
            const location = fixture.debugElement.injector.get(Location);
            expect(location.path()).toBe('/js/results');
        });
    });
});
