import {Component, Renderer2, ViewChild, Output, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {throttle} from 'lodash';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {WordpressSearchable} from '../../shared/wordpress-search-service/wordpress-searchable';
import {WordpressSearchService} from '../../shared/wordpress-search-service/wordpress-search.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

    public static readonly ENTER_KEY_CODE: number = 13;

    shouldDisplaySearchDetailsDropdown: boolean = false;
    searchText: string;
    searchResults: WordpressSearchable[] = [];
    searchState: SearchStates = SearchStates.Initial;
    searchStates = SearchStates;
    errorMessage: string = "Sorry, there was an error fetching search results. Please try again later.";
    throttledSearch: () => void = throttle(this.search, 500);

    @Output() onMobileNavToggled: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('searchContainer') searchContainer;
    @ViewChild('searchInput') searchInput;

    private lastSearchText: string;
    private deregisterWindowClickListener: () => void;
    private deregisterWindowTabListener: () => void;

    constructor(
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
        private googleAnalyticsService: GoogleAnalyticsService,
        private wordpressSearchService: WordpressSearchService,
        private router: Router) {
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
    }

    toggleSearchMobileBox(): void {
        if (!this.shouldDisplaySearchDetailsDropdown) {
            this.focusOnSearchBox();
        } else {
            this.collapseSearchBox();
        }
    }

    focusOnSearchBox(): void {
        this.handleSearchBoxFocussed();
        // Make sure the search box is actually visible before focusing on it
        this.changeDetector.detectChanges();
        this.searchInput.nativeElement.focus();
    }

    handleSearchBoxFocussed(): void {
        this.sendEventToAnalytics('search_focused');
        this.shouldDisplaySearchDetailsDropdown = true;
        // Ensure there is only ever one click listener
        if (this.deregisterWindowClickListener) {
            this.deregisterWindowClickListener();
        }
        this.deregisterWindowClickListener = this.renderer.listen('window', 'click', event => this.handleWindowClick(event));
        this.deregisterWindowTabListener = this.renderer.listen('window', 'keyup', event => this.handleWindowClick(event));
    }

    handleInputChange(): void {
        if (this.searchText === this.lastSearchText) {
            return;
        }
        this.throttledSearch();
    }

    handleWindowClick(event): void {
        const clickedElement = event.target;
        const isStillWithinSearchContainer = clickedElement
            && this.searchContainer.nativeElement.contains(clickedElement);
        if (!isStillWithinSearchContainer) {
            this.collapseSearchBox();
        }
    }

    collapseSearchBox(): void {
        this.deregisterWindowClickListener();
        this.deregisterWindowTabListener();
        this.searchText = null;
        this.shouldDisplaySearchDetailsDropdown = false;

        setTimeout(() => {
            this.searchState = SearchStates.Initial;
            this.resetSearchResults();
        }, 500);
    }

    search(): void {
        if (!this.searchText) {
            // Empty searchbox
            return;
        }
        this.sendEventToAnalytics('search_submitted', this.searchText.toLowerCase());

        this.searchState = SearchStates.Loading;
        this.resetSearchResults();
        this.wordpressSearchService.search(this.searchText)
            .subscribe(results => {
                    this.handleSearchResponse(results);
                },
                () => this.handleSearchError()
            );
    }

    goToSearchPage(): void {
        if (!this.searchText) {
            return;
        }
        this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
    }

    goToRouteOnEnterPress(event, route: string): void {
        if (event.keyCode === SearchBarComponent.ENTER_KEY_CODE) {
            this.router.navigate([route]);
            this.collapseSearchBox();
            this.sendEventToAnalytics('search-result_clicked', route);
        }
    }

    resetSearchResults(): void {
        this.searchResults = [];
    }

    handleSearchResponse(results: WordpressSearchable[]): void {
        if (results.length === 0) {
            this.searchState = SearchStates.NoResults;
            return;
        }
        this.searchResults = results;
        this.searchState = SearchStates.Results;
    }

    handleSearchError(): void {
        this.searchState = SearchStates.Error;
    }

    sendEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'search', eventLabel);
    }
}

enum SearchStates {
    Initial,
    Loading,
    Results,
    NoResults,
    Error
}
