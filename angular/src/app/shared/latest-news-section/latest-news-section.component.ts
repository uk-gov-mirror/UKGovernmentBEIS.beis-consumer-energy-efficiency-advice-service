import {Component, OnInit, Input} from '@angular/core';
import {WordpressPage} from '../wordpress-pages-service/wordpress-page';
import {WordpressPagesService} from '../wordpress-pages-service/wordpress-pages.service';
import {GoogleAnalyticsService} from "../analytics/google-analytics.service";

@Component({
    selector: 'app-latest-news-section',
    templateUrl: './latest-news-section.component.html',
    styleUrls: ['./latest-news-section.component.scss']
})
export class LatestNewsSectionComponent implements OnInit {
    latestNews: WordpressPage[];

    @Input() googleAnalyticsCategory: string;

    constructor(private pageService: WordpressPagesService,
                private googleAnalyticsService: GoogleAnalyticsService) {
    }

    ngOnInit() {
        this.pageService.getLatestPages()
            .subscribe(pages => this.latestNews = pages);
    }

    sendEventToAnalytics(articleIndex: number) {
        if (this.googleAnalyticsCategory) {
            const eventName = `article${articleIndex + 1}_clicked`;
            this.googleAnalyticsService.sendEvent(eventName, this.googleAnalyticsCategory);
        }
    }
}
