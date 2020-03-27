import {Component, OnInit} from '@angular/core';
import {PageTitleService} from "../page-title-service/page-title.service";

@Component({
    selector: 'app-forbidden-page',
    templateUrl: './forbidden-page.component.html'
})
export class ForbiddenPageComponent implements OnInit {
    constructor(private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('Forbidden');
    }
}
