import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DataCardComponent} from "../../data-card/data-card.component";
import {YourPlanSummaryComponent} from "../../your-plan-summary/your-plan-summary.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {RecommendationStepCardComponent} from "./recommendation-step-card.component";
import {RecommendationStep} from "../../recommendations/recommendation-step";
import {RouterTestingModule} from "@angular/router/testing";

describe('RecommendationStepCardComponent', () => {
    let component: RecommendationStepCardComponent;
    let fixture: ComponentFixture<RecommendationStepCardComponent>;

    const step: RecommendationStep = {
        headline: 'Choose the right loft insulation',
        description: 'The type of loft insulation to install depends on your intended usage of your loft',
        moreInfoLinks: [
            {
                buttonText: 'Test static page 1',
                route: '/js/static-page-1'
            },
            {
                buttonText: 'Test static page 2',
                route: '/js/static-page-2'
            }
        ]
    };

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                RecommendationStepCardComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [{provide: ResponseData, useValue: responseData}],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationStepCardComponent);
        component = fixture.componentInstance;
        component.step = step;
        component.stepIndex = 0;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct step number', () => {
        const stepNumberElement = fixture.debugElement.query(By.css('.step-number')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual('step 01');
    });

    it('should display the correct headline', () => {
        const stepNumberElement = fixture.debugElement.query(By.css('.step-headline')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual(step.headline.toLowerCase());
    });

    it('should initialise with the details drawer collapsed', () => {
        const detailsDrawerElement = fixture.debugElement.query(By.css('.step-details-drawer'));
        expect(detailsDrawerElement.classes.expanded).toBeFalsy();
    });

    it('should expand the details drawer when button is clicked', () => {
        // when
        toggleDetailsDrawerExpanded();

        // then
        const detailsDrawerElement = fixture.debugElement.query(By.css('.step-details-drawer'));
        expect(detailsDrawerElement.classes.expanded).toBeTruthy();
    });

    it('should display the correct description', () => {
        // when
        toggleDetailsDrawerExpanded();

        // then
        const stepNumberElement = fixture.debugElement.query(By.css('.step-description')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual(step.description.toLowerCase());
    });

    it('should display the correct links', () => {
        // when
        toggleDetailsDrawerExpanded();

        // then
        const actualLinkTexts = fixture.debugElement.queryAll(By.css('.more-info-description'))
            .map(el => el.nativeElement.innerText.toLowerCase());
        const expectedTexts = step.moreInfoLinks
            .map(link => link.buttonText.toLowerCase());
        expectedTexts.forEach(text => expect(actualLinkTexts).toContain(text));
    });

    function toggleDetailsDrawerExpanded() {
        const mainRowElement = fixture.debugElement.query(By.css('.step-main-row')).nativeElement;
        mainRowElement.click();
        fixture.detectChanges();
    }
});