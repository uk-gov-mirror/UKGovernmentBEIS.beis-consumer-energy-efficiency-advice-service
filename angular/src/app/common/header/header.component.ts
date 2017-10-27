import {Component, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    shouldDisplayExpandedSearchBar: boolean = false;
    deregisterFocusOutListener: () => void;

    @ViewChild('searchContainer') searchContainer;

    constructor(private renderer: Renderer2) {
    }

    handleSearchBoxFocussed(): void {
        this.shouldDisplayExpandedSearchBar = true;
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
        this.shouldDisplayExpandedSearchBar = false;
        this.deregisterFocusOutListener();
    }
}