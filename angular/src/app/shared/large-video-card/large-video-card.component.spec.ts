import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {LargeVideoCardComponent} from './large-video-card.component';
import {Video} from './video';

describe('LargeVideoCardComponent', () => {
    let component: LargeVideoCardComponent;
    let fixture: ComponentFixture<LargeVideoCardComponent>;

    const video: Video = {
        title: 'Video title',
        imagePath: '',
        articlePath: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            declarations: [
                LargeVideoCardComponent,
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
});
