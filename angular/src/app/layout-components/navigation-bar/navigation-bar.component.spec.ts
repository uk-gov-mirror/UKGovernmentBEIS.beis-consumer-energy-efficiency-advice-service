import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationBarComponent} from './navigation-bar.component';
import {Observable} from 'rxjs/Observable';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {WordpressPage} from '../../shared/wordpress-pages-service/wordpress-page';

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;
    let fetchTopLevelPagesSpy: jasmine.Spy;

    const mockWordpressPagesService = {
        fetchTopLevelPages: () => Observable.of([])
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NavigationBarComponent ],
            imports: [RouterTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationBarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the wordpress pages service', async(() => {
        // when
        injectMockWordpressPagesCallbackAndDetectChanges(() => Observable.of([]));

        // then
        fixture.whenStable().then(() => {
            expect(fetchTopLevelPagesSpy).toHaveBeenCalled();
        });
    }));

    it('should display links to all top level pages returned by the wordpress service', async(() => {
        // given
        const wordpressPages = [
            {route: 'wp-page/page-zero',  title: 'Page zero'},
            {route: 'wp-page/page-one',   title: 'Page one'},
            {route: 'wp-page/page-two',   title: 'Page two'},
            {route: 'wp-page/page-three', title: 'Page three'},
        ] as WordpressPage[];

        // when
        injectMockWordpressPagesCallbackAndDetectChanges(() => Observable.of(wordpressPages));

        // then
        fixture.whenStable().then(() => {
            const allPageLinkElements = fixture.debugElement.queryAll(By.css('.menu-item'));
            expect(allPageLinkElements.length).toBe(4);
            expect(allPageLinkElements[2].nativeElement.innerText).toBe('Page two');
            expect(allPageLinkElements[2].nativeElement.href).toContain('/page-two');
        });
    }));

    function injectMockWordpressPagesCallbackAndDetectChanges(fetchTopLevelPages: () => Observable<WordpressPage[]>) {
        const injectedWordpressPagesService = fixture.debugElement.injector.get(WordpressPagesService);
        injectedWordpressPagesService.getTopLevelPages = fetchTopLevelPages;
        fetchTopLevelPagesSpy = spyOn(injectedWordpressPagesService, 'getTopLevelPages').and.callThrough();
        fixture.detectChanges();
    }
});
