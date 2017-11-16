import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {GrantCardComponent} from "./grant-card.component";
import {LocalGrantResponse} from "../local-authority-service/local-authority-response";

describe('GrantCardComponent', () => {
    let component: GrantCardComponent;
    let fixture: ComponentFixture<GrantCardComponent>;

    const grant: LocalGrantResponse = {
        display_name: 'Name',
        description: 'Description'
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
        expect(recommendationDescriptionElement.innerText).toBe(grant.display_name);
    });

    it('should display the correct description', () => {
        const recommendationDescriptionElement = fixture.debugElement.query(By.css('.description')).nativeElement;
        expect(recommendationDescriptionElement.innerText).toBe(grant.description);
    });
});
