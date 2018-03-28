import {Component, Renderer2, ViewChild, Output, ChangeDetectorRef, EventEmitter, ElementRef, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {WordpressMeasuresService} from '../../shared/wordpress-measures-service/wordpress-measures.service';
import {WordpressSearchable} from '../../shared/wordpress-api-service/wordpress-searchable';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    displaySearch: boolean = false;
    @Input() shouldCloseSearchBar: Subject<any>;
    @Output() onMobileNavToggled: EventEmitter<null> = new EventEmitter<null>();
    @Output() closeSearch: EventEmitter<null> = new EventEmitter<null>();
    @Output() closeNav: EventEmitter<null> = new EventEmitter<null>();
    @ViewChild('searchBarContainer') searchBarContainer: ElementRef;

    constructor() {
    }

    ngOnInit() {
        this.shouldCloseSearchBar.subscribe(event => {
            this.searchBarContainer.nativeElement.style.display = "none";
        });
    }

    toggleSearchTabletBox(): void {
        this.closeNav.emit();

        if (this.searchBarContainer.nativeElement.style.display === "flex") {
            this.searchBarContainer.nativeElement.style.display = "none";
        } else {
            this.searchBarContainer.nativeElement.style.display = "flex";
        }
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
        this.closeSearch.emit();
    }
}
