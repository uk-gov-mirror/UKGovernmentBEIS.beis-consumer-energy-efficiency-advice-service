import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import "rxjs/add/operator/switchMap";

import {Observable} from "rxjs/Observable";
import {PageService} from "./page.service";
import {Page} from "./page";

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    providers: [PageService]
})
export class PageComponent implements OnInit {
    pageData: Observable<Page>;

    constructor(private route: ActivatedRoute,
                private pageService: PageService) {
    }

    ngOnInit() {
        this.pageData = this.route.paramMap
            .switchMap(params => this.pageService.getPage(params.get('slug')))
            .shareReplay(1);
    }
}
