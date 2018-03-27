import {Component, Renderer2, ViewChild, Output, ChangeDetectorRef, EventEmitter, ElementRef} from '@angular/core';
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
    @ViewChild('searchBarContainer') searchBarContainer: ElementRef;

    constructor() {
    }

    toggleSearchTabletBox(): void {
        if (this.searchBarContainer.nativeElement.style.display === "flex") {
            this.searchBarContainer.nativeElement.style.display = "none";
        } else {
            this.searchBarContainer.nativeElement.style.display = "flex";
        }
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
    }
}
