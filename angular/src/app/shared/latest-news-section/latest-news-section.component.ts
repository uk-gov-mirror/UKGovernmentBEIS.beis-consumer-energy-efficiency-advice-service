import { Component, OnInit } from '@angular/core';
import {WordpressPage} from '../wordpress-pages-service/wordpress-page';
import {WordpressPagesService} from '../wordpress-pages-service/wordpress-pages.service';

@Component({
    selector: 'app-latest-news-section',
    templateUrl: './latest-news-section.component.html',
    styleUrls: ['./latest-news-section.component.scss']
})
export class LatestNewsSectionComponent implements OnInit {
    latestNews: WordpressPage[];

    constructor(private pageService: WordpressPagesService) {
    }

    ngOnInit() {
        this.pageService.getLatestPages()
            .subscribe(pages => this.latestNews = pages);
    }
}
