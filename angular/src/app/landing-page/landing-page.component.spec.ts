import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {LargeVideoCardComponent} from "./large-video-card/large-video-card.component";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {LatestNewsCardComponent} from "../common/latest-news-card/latest-news-card.component";
import {LandingPageComponent} from "./landing-page.component";
import {NavigationBarComponent} from "../common/navigation-bar/navigation-bar.component";

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
    let router: Router;

    const headingText = 'heading';
    const postcode = 'w11aa';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule.withRoutes([]),
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        // given
        component.heading = headingText;

        // when
        fixture.detectChanges();

        // then
        const heading: DebugElement = fixture.debugElement.query(By.css('.page-heading .heading-text'));
        expect(heading.nativeElement.innerText).toEqual(headingText);
    });

    it('should navigate to the questionnaire upon entering a postcode', () => {
        // given
        component.postcodeInput = postcode;

        //when
        const submitButton = fixture.debugElement.query(By.css('.postcode-input-submit'));
        submitButton.nativeElement.click();

        // then
        const expectedPartialResponse = {postcode: postcode};
        expect(router.navigate).toHaveBeenCalledWith(['/questionnaire/home-basics', {partialResponse: JSON.stringify(expectedPartialResponse)}]);
    });
});
