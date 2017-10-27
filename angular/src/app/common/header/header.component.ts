import {Component, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    isSearchBarFocussed: boolean = false;
    deregisterFocusOutListener: () => void;

    @ViewChild('searchContainer') searchContainer;

    constructor(private renderer: Renderer2) {
    }

    handleSearchBoxFocussed(): void {
        this.isSearchBarFocussed = true;
        this.deregisterFocusOutListener = this.renderer.listen('window', 'focusout', event => this.handleFocusOutEvent(event));
    }

    handleFocusOutEvent(event): void {
        const focussedElement = event.relatedTarget;
        if (focussedElement && this.searchContainer.nativeElement.contains(focussedElement)) {
            return;
        }
        this.isSearchBarFocussed = false;
        this.deregisterFocusOutListener();
    }
}