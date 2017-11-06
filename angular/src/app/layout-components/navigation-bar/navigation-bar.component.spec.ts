import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {NavigationBarComponent} from "./navigation-bar.component";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {WordpressPagesService} from "../../shared/wordpress-pages-service/wordpress-pages.service";
import {PageStateService} from "../../shared/page-state-service/page-state.service";
import {WordpressPage} from "../../shared/wordpress-pages-service/wordpress-page";

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;
    let fetchTopLevelPagesSpy: jasmine.Spy;
    let showGenericErrorSpy: jasmine.Spy;

    const mockWordpressPagesService = {
        fetchTopLevelPages: () => Observable.of([])
    };
    const mockPageStateService = {
        showLoading: () => {},
        showGenericErrorAndLogMessage: () => {},
        showLoadingComplete: () => {}
    };

    beforeEach(async(() => {
        showGenericErrorSpy = spyOn(mockPageStateService, 'showGenericErrorAndLogMessage');

        TestBed.configureTestingModule({
            declarations: [ NavigationBarComponent ],
            imports: [RouterTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: PageStateService, useValue: mockPageStateService}
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

    it('should display an error if wordpress pages service returns an error', async(() => {
        // when
        injectMockWordpressPagesCallbackAndDetectChanges(() => ErrorObservable.create('some error'));

        // then
        fixture.whenStable().then(() => {
            expect(showGenericErrorSpy).toHaveBeenCalled();
        });
    }));

    it('should display links to all top level pages returned by the wordpress service', async(() => {
        // given
        const wordpressPages = [
            {path: '/page-zero',  title: 'Page zero'},
            {path: '/page-one',   title: 'Page one'},
            {path: '/page-two',   title: 'Page two'},
            {path: '/page-three', title: 'Page three'},
        ];

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
        let injectedWordpressPagesService = fixture.debugElement.injector.get(WordpressPagesService);
        injectedWordpressPagesService.fetchTopLevelPages = fetchTopLevelPages;
        fetchTopLevelPagesSpy = spyOn(injectedWordpressPagesService, 'fetchTopLevelPages').and.callThrough();
        fixture.detectChanges();
    }
});
