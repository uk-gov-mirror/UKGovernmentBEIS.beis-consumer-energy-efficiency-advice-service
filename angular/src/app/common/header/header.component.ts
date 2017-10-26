import {Component, Renderer2, ViewChild} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    isSearchBarFocussed: boolean = false;
    deregisterFocusListener: () => void;

    @ViewChild('searchContainer') searchContainer;

    constructor(private renderer: Renderer2) {
    }

    handleSearchBoxFocussed() {
        this.isSearchBarFocussed = true;
        this.deregisterFocusListener = this.renderer.listen('window', 'focusin', event => this.handleBlurEvent(event));
    }

    handleBlurEvent(event) {
        const isFocussedElementInSearchContainer = this.searchContainer.nativeElement.contains(event.target);
        if (!isFocussedElementInSearchContainer) {
            this.isSearchBarFocussed = false;
            this.deregisterFocusListener();
        }
    }
}