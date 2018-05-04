import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {LocalGrantCardComponent} from './local-grant-card.component';
import {GrantEligibility} from '../../grants/grant-eligibility-service/grant-eligibility';
import {LocalAuthorityGrant} from "../../grants/model/local-authority-grant";
import {InlineSVGModule} from 'ng-inline-svg';

describe('LocalGrantCardComponent', () => {
    let component: LocalGrantCardComponent;
    let fixture: ComponentFixture<LocalGrantCardComponent>;

    const grant: LocalAuthorityGrant = {
        grantId: 'grant-id',
        name: 'Name',
        description: 'Description',
        eligibilityCriteria: 'Test criteria',
        phoneNumber: '1234',
        websiteUrl: 'http://example.com',
        eligibility: GrantEligibility.MayBeEligible,
        steps: []
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LocalGrantCardComponent],
            imports: [InlineSVGModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalGrantCardComponent);
        component = fixture.componentInstance;
        component.grant = Object.assign({}, grant);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        const headingElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(headingElement.innerText).toBe(grant.name);
    });

    it('should display the correct description', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(descriptionElement.innerText).toBe(grant.description);
    });

    it('should display the correct eligibility criteria', () => {
        const elegibilityElement = fixture.debugElement.query(By.css('.eligibility-criteria')).nativeElement;
        expect(elegibilityElement.innerText).toContain(grant.eligibilityCriteria);
    });

    it('should display the website only if it exists', () => {
        const websiteUrlElement = fixture.debugElement.query(By.css('.find-out-more-link')).nativeElement;
        expect(websiteUrlElement.getAttribute('href')).toBe(grant.websiteUrl);
        const phoneNumberElement = fixture.debugElement.query(By.css('.phone-number'));
        expect(phoneNumberElement).toBeFalsy();
    });

    it('should display the phone number if there is no website', () => {
        component.grant.websiteUrl = null;

        fixture.detectChanges();

        const phoneNumberElement = fixture.debugElement.query(By.css('.phone-number')).nativeElement;
        expect(phoneNumberElement.innerText).toBe(grant.phoneNumber);
    });
});
