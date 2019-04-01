import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import endsWith from 'lodash-es/endsWith';
import {LinkButtonComponent} from "./link-button.component";

describe('LinkButtonComponent', () => {
    let component: LinkButtonComponent;
    let fixture: ComponentFixture<LinkButtonComponent>;

    const buttonText = 'test button text';
    const linkUrl = 'test-link-url';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkButtonComponent);
        component = fixture.componentInstance;
        component.buttonText = buttonText;
        component.linkUrl = linkUrl;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct button text', () => {
        const buttonTextElement = fixture.debugElement.query(By.css('.link-button-text')).nativeElement;
        expect(buttonTextElement.innerText.toLowerCase()).toEqual(buttonText);
    });

    it('should link to the correct URL', () => {
        const buttonElement = fixture.debugElement.query(By.css('.link-button')).nativeElement;
        const actualUrl = buttonElement.href;
        const actualUrlEndsWithLinkUrl = endsWith(actualUrl, linkUrl);
        expect(actualUrlEndsWithLinkUrl).toBe(true);
    });
});
