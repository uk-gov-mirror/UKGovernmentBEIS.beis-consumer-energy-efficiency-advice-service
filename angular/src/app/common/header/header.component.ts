import {Component, Renderer2, ViewChild} from '@angular/core';
import {WordpressPagesService} from './wordpress-pages-service/wordpress-pages.service';
import {WordpressPageResponse} from './wordpress-pages-service/wordpress-page-response';
import {WordpressPage} from './wordpress-pages-service/wordpress-page';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    static readonly numberOfSearchResultsToDisplayWhenNotExpanded = 3;

    shouldDisplaySearchDetailsDropdown: boolean = false;
    shouldDisplayExpandSearchResultsButton: boolean = false;
    shouldDisplayExpandedSearchResults: boolean = false;
    deregisterFocusOutListener: () => void;
    searchText: string;
    allSearchResults: WordpressPage[] = [];
    searchState: SearchStates = SearchStates.Initial;
    searchStates = SearchStates;

    @ViewChild('searchContainer') searchContainer;
    @ViewChild('searchInput') searchInput;

    constructor(private renderer: Renderer2, private wordpressPagesService: WordpressPagesService) {
    }

    handleSearchBoxFocussed(): void {
        this.shouldDisplaySearchDetailsDropdown = true;
        this.deregisterFocusOutListener = this.renderer.listen('window', 'focusout', event => this.handleFocusChange(event));
    }

    // For accessibility it should be possible to focus the links in the expanded search container by pressing tab.
    // So when the search input is defocussed, we don't want to hide the expanded search container if the focus has moved
    // to one of the links within the search container. But we do want to minimise the search container when focus moves outside it.
    handleFocusChange(event): void {
        const newFocussedElement = event.relatedTarget;
        const isFocusStillInsideExpandedSearchContainer = newFocussedElement &&
            this.searchContainer.nativeElement.contains(newFocussedElement);
        if (isFocusStillInsideExpandedSearchContainer) {
            return;
        }
        this.collapseSearchBox();
    }

    collapseSearchBox(): void {
        this.shouldDisplaySearchDetailsDropdown = false;
        this.deregisterFocusOutListener();
        this.searchText = null;
        setTimeout(() => {
            this.searchState = SearchStates.Initial;
            this.resetSearchResults();
        }, 500);
    }

    searchForPages(): void {
        this.searchState = SearchStates.Loading;
        this.resetSearchResults();
        this.wordpressPagesService.searchPages(this.searchText)
            .subscribe(
                response => this.handleSearchResponse(response),
                () => this.handleSearchError()
            );
    }

    resetSearchResults(): void {
        this.allSearchResults = [];
        this.shouldDisplayExpandedSearchResults = false;
        this.shouldDisplayExpandSearchResultsButton = false;
    }

    handleSearchResponse(results: WordpressPageResponse[]): void {
        if (results.length === 0) {
            this.searchState = SearchStates.NoResults;
            return;
        }
        this.allSearchResults = results.map(result => new WordpressPage(result));
        if (results.length > HeaderComponent.numberOfSearchResultsToDisplayWhenNotExpanded) {
            this.shouldDisplayExpandSearchResultsButton = true;
        }
        this.searchState = SearchStates.Results;
    }

    handleSearchError(): void {
        this.searchState = SearchStates.Error;
    }

    displayExpandedSearchResults(): void {
        this.shouldDisplayExpandedSearchResults = true;
        this.shouldDisplayExpandSearchResultsButton = false;
        // Maintain focus inside searchContainer to prevent focusout listener causing searchContainer to collapse
        this.searchInput.nativeElement.focus();
    }

    getSearchResultsToDisplay(): WordpressPage[] {
        return this.shouldDisplayExpandedSearchResults ?
            this.allSearchResults :
            this.allSearchResults.slice(0, HeaderComponent.numberOfSearchResultsToDisplayWhenNotExpanded);
    }
}

enum SearchStates {
    Initial,
    Loading,
    Results,
    NoResults,
    Error
}