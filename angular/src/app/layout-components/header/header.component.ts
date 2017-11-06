import {Component, Renderer2, ViewChild} from "@angular/core";
import {WordpressPage} from "../../shared/wordpress-pages-service/wordpress-page";
import {WordpressPagesService} from "../../shared/wordpress-pages-service/wordpress-pages.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    static readonly reducedSearchResultsQuantity = 3;

    shouldDisplaySearchDetailsDropdown: boolean = false;
    shouldDisplayExpandSearchResultsButton: boolean = false;
    shouldDisplayExpandedSearchResults: boolean = false;
    searchText: string;
    searchState: SearchStates = SearchStates.Initial;
    searchStates = SearchStates;

    private allSearchResults: WordpressPage[] = [];
    private deregisterFocusOutListener: () => void;

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
        if (!isFocusStillInsideExpandedSearchContainer) {
            this.collapseSearchBox();
        }
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

    handleSearchResponse(results: WordpressPage[]): void {
        if (results.length === 0) {
            this.searchState = SearchStates.NoResults;
            return;
        }
        this.allSearchResults = results;
        if (results.length > HeaderComponent.reducedSearchResultsQuantity) {
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
            this.allSearchResults.slice(0, HeaderComponent.reducedSearchResultsQuantity);
    }
}

enum SearchStates {
    Initial,
    Loading,
    Results,
    NoResults,
    Error
}