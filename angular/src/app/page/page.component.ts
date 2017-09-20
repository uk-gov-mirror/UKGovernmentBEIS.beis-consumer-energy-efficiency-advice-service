import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { PageService } from './page.service';
import { Page } from './page';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css'],
    providers: [PageService]
})
export class PageComponent implements OnInit {
    pageData: Page;

    constructor(private route:ActivatedRoute,
                private pageService:PageService) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap(params => this.pageService.getPage(params.get('slug')))
            .subscribe(page => this.pageData = page)
    }
}
