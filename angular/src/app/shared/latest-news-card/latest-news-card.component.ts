import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WordpressPage} from '../wordpress-pages-service/wordpress-page';
import {getAcfImageUrlForMinSize} from "../wordpress-pages-service/acf-image";

@Component({
    selector: 'app-latest-news-card',
    templateUrl: './latest-news-card.component.html',
    styleUrls: ['./latest-news-card.component.scss']
})
export class LatestNewsCardComponent implements OnInit {
    @Input() page: WordpressPage;
    @Output() onArticleClicked: EventEmitter<null> = new EventEmitter<null>();

    imageUrl: string;

    onClick() {
        this.onArticleClicked.emit();
    }

    ngOnInit() {
        // Look for the smallest image that works
        const imageUrl = getAcfImageUrlForMinSize(600, this.page.coverImage);
        this.imageUrl = imageUrl
            ? 'url(' + imageUrl + ')'
            : null;
    }
}
