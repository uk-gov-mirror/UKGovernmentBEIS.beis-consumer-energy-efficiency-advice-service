import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    displaySearch: boolean = false;

    constructor() {
    }

    toggleSearchMobileBox(): void {
        this.displaySearch = !this.displaySearch;
    }
}
