import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {LargeVideoCardComponent} from "./large-video-card.component";

describe('LargeVideoCardComponent', () => {
    let component: LargeVideoCardComponent;
    let fixture: ComponentFixture<LargeVideoCardComponent>;

    const title = 'Video title';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LargeVideoCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LargeVideoCardComponent);
        component = fixture.componentInstance;
        component.title = title;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right title', () => {
        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleElement.innerText).toEqual(title);
    });
});
