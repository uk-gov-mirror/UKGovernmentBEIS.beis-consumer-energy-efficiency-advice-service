import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {LargeVideoCardComponent} from './large-video-card.component';
import { PopupComponent } from '../popup/popup.component';
import {Video} from './video';

describe('LargeVideoCardComponent', () => {
    let component: LargeVideoCardComponent;
    let fixture: ComponentFixture<LargeVideoCardComponent>;

    const video: Video = {
        title: 'Video title',
        synopsis: 'Video synopsis',
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LargeVideoCardComponent,
                PopupComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LargeVideoCardComponent);
        component = fixture.componentInstance;
        component.video = video;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right title', () => {
        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleElement.innerText).toEqual(video.title);
    });

    it('should display the synopsis when needed', () => {
        // When
        component.displaySynopsis = true;
        fixture.detectChanges();
        const synopsisText = fixture.debugElement.query(By.css('.popup .popup-body')).nativeElement;

        // Then
        expect(synopsisText.innerText).toEqual(video.synopsis);
    });

    it('should hide the synopsis when not needed', () => {
        // When
        component.displaySynopsis = false;
        fixture.detectChanges();
        const synopsisElement = fixture.debugElement.query(By.css('.popup .popup-body'));

        // Then
        expect(synopsisElement).toBeFalsy();
    });
});
