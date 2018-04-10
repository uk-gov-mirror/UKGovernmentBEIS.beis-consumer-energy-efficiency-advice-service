import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {HeaderComponent} from './header.component';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {WordpressPageResponse} from '../../shared/wordpress-pages-service/wordpress-page-response';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WordpressMeasuresService} from '../../shared/wordpress-measures-service/wordpress-measures.service';
import {NeedHelpComponent} from "../../shared/need-help/need-help.component";
import {UserStateService} from "../../shared/user-state-service/user-state-service";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let injector: TestBed;

    const mockSearchResult: WordpressPageResponse[] = [
        {slug: 'page-1', title: {rendered: 'Test page 1'}, content: {rendered: 'Test page 1'}, acf: null},
        {slug: 'page-2', title: {rendered: 'Test page 2'}, content: {rendered: 'Test page 2'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 3'}, content: {rendered: 'Test page 3'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 4'}, content: {rendered: 'Test page 4'}, acf: null},
        {slug: 'page-3', title: {rendered: 'Test page 5'}, content: {rendered: 'Test page 5'}, acf: null}
    ];

    const mockWordpressPagesService = {searchPages: (searchString) => Observable.of(mockSearchResult)};
    const mockWordpressMeasuresService = {searchMeasures: (searchString) => Observable.of(mockSearchResult)};
    const mockUserStateService = {getSessionReference: () => "reference"};

    beforeEach(async(() => {
        spyOn(mockWordpressPagesService, 'searchPages').and.callThrough();
        spyOn(mockWordpressMeasuresService, 'searchMeasures').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                NeedHelpComponent
            ],
            imports: [FormsModule, RouterTestingModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                {provide: WordpressMeasuresService, useValue: mockWordpressMeasuresService},
                {provide: UserStateService, useValue: mockUserStateService},
            ]
        })
            .compileComponents();
        injector = getTestBed();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should initialise with search box collapsed', () => {
            const searchDetailsDropdown = fixture.debugElement.query(By.css('.search-details-dropdown'));
            expect(searchDetailsDropdown.nativeElement.clientHeight).toBe(0);
        });

        it('should initialise with elements in search box outside tab navigation', () => {
            const seeAllSearchResultsButton = fixture.debugElement.query(By.css('.popular-searches .text-row'));
            expect(seeAllSearchResultsButton.nativeElement.tabIndex).toBe(-1);
        });
    });

    describe('#handleSearchBoxFocussed', () => {
        it('should expand the search box', async(() => {
            // given
            const searchBoxElement = fixture.debugElement.query(By.css('.search-input'));

            // when
            searchBoxElement.triggerEventHandler('focus', null);
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const searchDetailsDropdown = fixture.debugElement.query(By.css('.search-details-dropdown'));
                expect(searchDetailsDropdown.nativeElement.clientHeight).toBeGreaterThan(0);
            });
        }));

        it('should add elements in the search box to tab navigation', async(() => {
            // given
            const searchBoxElement = fixture.debugElement.query(By.css('.search-input'));

            // when
            searchBoxElement.triggerEventHandler('focus', null);
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const seeAllSearchResultsButton = fixture.debugElement.query(By.css('.popular-searches .text-row'));
                expect(seeAllSearchResultsButton.nativeElement.tabIndex).toBe(0);
            });
        }));

        it('should display search box in initial state', async(() => {
            // given
            const searchBoxElement = fixture.debugElement.query(By.css('.search-input'));

            // when
            searchBoxElement.triggerEventHandler('focus', null);
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.Initial);
            });
        }));
    });

    describe('#search', () => {

        beforeEach(() => {
            const searchBoxElement = fixture.debugElement.query(By.css('.search-input'));
            searchBoxElement.triggerEventHandler('focus', null);
            fixture.detectChanges();
        });

        it('should search with the correct search string', () => {
            // given
            const searchString = 'dummy search text';
            component.searchText = searchString;

            // when
            component.search();

            // then
            expect(mockWordpressPagesService.searchPages).toHaveBeenCalledWith(searchString);
            expect(mockWordpressMeasuresService.searchMeasures).toHaveBeenCalledWith(searchString);
        });

        it('should display an error if the search returns an error', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => ErrorObservable.create('error'));

            // when
            component.search();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.Error);
            });
        }));

        it('should display no-results if the search returns no results', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => Observable.of([]));

            // when
            component.search();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.NoResults);
            });
        }));

        it('should display first search results returned', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => Observable.of(mockSearchResult));

            // when
            component.search();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.Results);
                const allSearchResultElements = fixture.debugElement.queryAll(By.css('.search-results .text-row'));
                expect(allSearchResultElements.length).toEqual(HeaderComponent.reducedSearchResultsQuantity);
            });
        }));
    });

    describe('#displayExpandedSearchResults', () => {
        it('should display all search results', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => Observable.of(mockSearchResult));
            component.search();

            // when
            component.displayExpandedSearchResults();

            // then
            fixture.whenStable().then(() => {
                expect(component.getSearchResultsToDisplay().length).toEqual(mockSearchResult.length * 2);
            });
        }));
    });

    function injectSearchCallbackAndDetectChanges(callback: (searchText: string) => Observable<WordpressPageResponse[]>) {
        const injectedSearchPageService = injector.get(WordpressPagesService);
        const injectedSearchMeasuresService = injector.get(WordpressMeasuresService);
        injectedSearchPageService.searchPages = callback;
        injectedSearchMeasuresService.searchMeasures = callback;
        fixture.detectChanges();
    }
});
