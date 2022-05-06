import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {SearchBarComponent} from './search-bar.component';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NeedHelpComponent} from '../../shared/need-help/need-help.component';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {WordpressSearchService} from '../../shared/wordpress-search-service/wordpress-search.service';
import {WordpressSearchable} from '../../shared/wordpress-search-service/wordpress-searchable';
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;
    let injector: TestBed;

    const mockSearchResult: WordpressSearchable[] = [
        {route: 'page-1', title: 'Test page 1', descriptionHtml: 'Description 1', tags: []},
        {route: 'page-2', title: 'Test page 2', descriptionHtml: 'Description 2', tags: []},
        {route: 'page-3', title: 'Test page 3', descriptionHtml: 'Description 3', tags: []},
        {route: 'page-3', title: 'Test page 4', descriptionHtml: 'Description 4', tags: []},
        {route: 'page-3', title: 'Test page 5', descriptionHtml: 'Description 5', tags: []}
    ];

    const mockWordpressSearchService = {search: () => Observable.of(mockSearchResult)};
    const mockUserStateService = {getSessionReference: () => "reference"};

    beforeEach(async(() => {
        spyOn(mockWordpressSearchService, 'search').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                SearchBarComponent,
                NeedHelpComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [FormsModule, RouterTestingModule, InlineSVGModule, HttpClientTestingModule],
            providers: [
                {provide: WordpressSearchService, useValue: mockWordpressSearchService},
                {provide: UserStateService, useValue: mockUserStateService},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
        injector = getTestBed();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBarComponent);
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

        it('should do nothing if the search text is empty', async(() => {
            // given
            component.searchText = '';

            // when
            component.search();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.Initial);
            });
        }));

        it('should search with the correct search string', () => {
            // given
            const searchString = 'dummy search text';
            component.searchText = searchString;

            // when
            component.search();

            // then
            expect(mockWordpressSearchService.search).toHaveBeenCalledWith(searchString);
        });

        it('should display an error if the search returns an error', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => ErrorObservable.create('error'));
            component.searchText = 'dummy search text';

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
            component.searchText = 'dummy search text';

            // when
            component.search();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.NoResults);
            });
        }));

        it('should display search results returned', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => Observable.of(mockSearchResult));
            component.searchText = 'dummy search text';

            // when
            component.search();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(component.searchState).toEqual(component.searchStates.Results);
                const allSearchResultElements = fixture.debugElement.queryAll(By.css('.search-results .text-row'));
                expect(allSearchResultElements.length).toEqual(mockSearchResult.length);
            });
        }));


        it('should add elements in the search box to tab navigation', async(() => {
            // given
            injectSearchCallbackAndDetectChanges(() => Observable.of(mockSearchResult));
            component.searchText = 'dummy search text';

            // when
            component.search();
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const firstSearchResult = fixture.debugElement.query(By.css('.search-results .text-row'));
                expect(firstSearchResult.nativeElement.tabIndex).toBe(0);
            });
        }));
    });

    function injectSearchCallbackAndDetectChanges(callback: (searchText: string) => Observable<WordpressSearchable[]>) {
        const injectedSearchService = injector.get(WordpressSearchService);
        injectedSearchService.search = callback;
        fixture.detectChanges();
    }
});
