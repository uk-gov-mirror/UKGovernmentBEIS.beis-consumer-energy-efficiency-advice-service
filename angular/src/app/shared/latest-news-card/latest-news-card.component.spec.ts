import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {LatestNewsCardComponent} from './latest-news-card.component';
import {WordpressPage} from '../wordpress-pages-service/wordpress-page';

describe('LatestNewsCardComponent', () => {
    let component: LatestNewsCardComponent;
    let fixture: ComponentFixture<LatestNewsCardComponent>;

    const page: WordpressPage = {
        title: 'heading',
        route: 'fake-route',
        coverImage: null,
        videoEmbed: null
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LatestNewsCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LatestNewsCardComponent);
        component = fixture.componentInstance;
        component.page = page;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        const headingElement = fixture.debugElement.query(By.css('.heading')).nativeElement;
        expect(headingElement.innerText).toEqual(page.title);
    });

    it('should not display a video play icon if there is no video', () => {
        const iconElement = fixture.debugElement.query(By.css('.icon-video-play'));
        expect(iconElement).toBeNull();
    });

    it('should display a video play icon if there is a video', () => {
        // given
        page.videoEmbed = 'http://test-video.com';
        fixture.detectChanges();

        // when
        const iconElement = fixture.debugElement.query(By.css('.icon-video-play'));

        // then
        expect(iconElement).not.toBeNull();
    });
});
