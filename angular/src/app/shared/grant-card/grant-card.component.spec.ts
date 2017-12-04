import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {GrantCardComponent} from "./grant-card.component";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";

describe('GrantCardComponent', () => {
    let component: GrantCardComponent;
    let fixture: ComponentFixture<GrantCardComponent>;

    const grant: GrantViewModel = {
        grantId: 'grant-id',
        name: 'Name',
        description: 'Description',
        eligibility: GrantEligibility.MayBeEligible,
        shouldDisplayWithoutMeasures: false,
        annualPaymentPounds: 120,
        linkedMeasureCodes: [],
        advantages: [],
        steps: []
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GrantCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantCardComponent);
        component = fixture.componentInstance;
        component.grant = grant;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        const recommendationDescriptionElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(recommendationDescriptionElement.innerText).toBe(grant.name);
    });

    it('should display the correct description', () => {
        const recommendationDescriptionElement = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(recommendationDescriptionElement.innerText).toBe(grant.description);
    });
});
