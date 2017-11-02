import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {NavigationBarComponent} from "./navigation-bar.component";
import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {WordpressPagesService} from "../wordpress-pages-service/wordpress-pages.service";
import {PageStateService} from "../page-state-service/page-state.service";
import {WordpressPageResponse} from "../wordpress-pages-service/wordpress-page-response";

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent;
    let fixture: ComponentFixture<NavigationBarComponent>;

    const mockWordpressPagesService = {
        fetchTopLevelPages: () => Observable.of([])
    };
    const mockPageStateService = {
        showLoading: () => {},
        showGenericErrorAndLogMessage: () => {},
        showLoadingComplete: () => {}
    };

    beforeEach(async(() => {
        spyOn(mockPageStateService, 'showGenericErrorAndLogMessage');

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
            expect(fixture.debugElement.injector.get(WordpressPagesService).fetchTopLevelPages).toHaveBeenCalled();
        });
    }));

    it('should display an error if wordpress pages service returns an error', async(() => {
        // when
        injectMockWordpressPagesCallbackAndDetectChanges(() => ErrorObservable.create('some error'));

        // then
        fixture.whenStable().then(() => {
            expect(fixture.debugElement.injector.get(PageStateService).showGenericErrorAndLogMessage).toHaveBeenCalled();
        });
    }));

    it('should display links to all top level pages returned by the wordpress service', async(() => {
        // given
        const wordpressPagesResponse = [
            {link: '/page-zero',  title: {rendered: 'Page zero'}},
            {link: '/page-one',   title: {rendered: 'Page one'}},
            {link: '/page-two',   title: {rendered: 'Page two'}},
            {link: '/page-three', title: {rendered: 'Page three'}},
        ];

        // when
        injectMockWordpressPagesCallbackAndDetectChanges(() => Observable.of(wordpressPagesResponse));

        // then
        fixture.whenStable().then(() => {
            const allPageLinkElements = fixture.debugElement.queryAll(By.css('.menu-item'));
            expect(allPageLinkElements.length).toBe(4);
            expect(allPageLinkElements[2].nativeElement.innerText).toBe('Page two');
            expect(allPageLinkElements[2].nativeElement.href).toContain('/page-two');
        });
    }));

    function injectMockWordpressPagesCallbackAndDetectChanges(fetchTopLevelPages: () => Observable<WordpressPageResponse[]>) {
        let injectedWordpressPagesService = fixture.debugElement.injector.get(WordpressPagesService);
        injectedWordpressPagesService.fetchTopLevelPages = fetchTopLevelPages;
        spyOn(injectedWordpressPagesService, 'fetchTopLevelPages').and.callThrough();
        fixture.detectChanges();
    }
});
