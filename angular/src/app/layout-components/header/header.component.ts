import {Component, ViewChild, Output, EventEmitter, ElementRef, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() shouldCloseSearchBar: Subject<any>;
    @Output() onMobileNavToggled: EventEmitter<null> = new EventEmitter<null>();
    @Output() closeSearch: EventEmitter<null> = new EventEmitter<null>();
    @Output() closeNav: EventEmitter<null> = new EventEmitter<null>();
    @ViewChild('searchBarContainer') searchBarContainer: ElementRef;

    constructor() {
    }

    ngOnInit() {
        this.shouldCloseSearchBar.subscribe(event => {
            this.searchBarContainer.nativeElement.classList.remove("showSearch");
        });
    }

    toggleSearchTabletBox(): void {
        this.closeNav.emit();

        if (this.searchBarContainer.nativeElement.classList.contains("showSearch")) {
            this.searchBarContainer.nativeElement.classList.remove("showSearch");
        } else {
            this.searchBarContainer.nativeElement.classList.add("showSearch");
        }
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
        this.closeSearch.emit();
    }
}
