import {Component, Renderer2, ViewChild, Output, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {WordpressMeasuresService} from '../../shared/wordpress-measures-service/wordpress-measures.service';
import {WordpressSearchable} from '../../shared/wordpress-api-service/wordpress-searchable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    displaySearch: boolean = false;
    @Output() onMobileNavToggled: EventEmitter<null> = new EventEmitter<null>();

    constructor() {
    }

    toggleSearchMobileBox(): void {
        this.displaySearch = !this.displaySearch;
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
    }
}
