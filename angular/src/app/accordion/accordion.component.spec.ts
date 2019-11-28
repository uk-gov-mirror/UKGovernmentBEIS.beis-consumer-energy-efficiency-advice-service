import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {AccordionComponent} from './accordion.component';

describe('AccordionComponent', () => {
    let component: AccordionComponent;
    let fixture: ComponentFixture<AccordionComponent>;

    const imageFilename = 'hotwatercylinder.jpg';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccordionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        component.imageFilename = imageFilename;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not be displayed on start up', async(() => {
        fixture.whenStable().then(() => {
            const element = fixture.debugElement.query(By.css('.collapsible-content'));
            const maxHeight = parseInt(window.getComputedStyle(element.nativeElement).maxHeight);
            expect(maxHeight).toBe(0);
        });
    }));

   describe('when clicking on the button', () => {
       it('should display the accordion', async(() => {
           fixture.whenStable().then(() => {
               const button = fixture.debugElement.query(By.css('.toggle')).nativeElement;
               button.click();
               fixture.detectChanges();
               expect(button.checked).toBeTruthy();
               const element = fixture.debugElement.query(By.css('.collapsible-content'));
               expect(parseInt(window.getComputedStyle(element.nativeElement).maxHeight)).toBeGreaterThan(0);
           });
       }));
        it('should close the accordion', async(() => {
            fixture.whenStable().then(() => {
                const button = fixture.debugElement.query(By.css('.toggle')).nativeElement;
                button.click();
                fixture.detectChanges();
                expect(button.checked).toBeTruthy();
                button.click();
                fixture.detectChanges();
                expect(button.checked).toBeFalsy();
                const element = fixture.debugElement.query(By.css('.collapsible-content'));
                const maxHeight = parseInt(window.getComputedStyle(element.nativeElement).maxHeight);
                expect(maxHeight).toBe(0);
            });
        }));
    });
});
