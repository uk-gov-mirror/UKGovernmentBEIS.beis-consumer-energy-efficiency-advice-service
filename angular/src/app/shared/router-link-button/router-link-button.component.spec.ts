import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {RouterLinkButtonComponent} from './router-link-button.component';

describe('RouterLinkButtonComponent', () => {
    let component: RouterLinkButtonComponent;
    let fixture: ComponentFixture<RouterLinkButtonComponent>;

    const linkText = 'Some link text';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RouterLinkButtonComponent
            ],
            imports: [
                RouterTestingModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RouterLinkButtonComponent);
        component = fixture.componentInstance;
        component.text = linkText;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the right link text', () => {
        const textElement = fixture.debugElement.query(By.css('.router-link-button-text')).nativeElement;
        expect(textElement.innerText).toBe(linkText.toUpperCase());
    });
});
