import {Component, Input, Output, EventEmitter} from '@angular/core';
import {WordpressPage} from '../wordpress-pages-service/wordpress-page';

@Component({
    selector: 'app-latest-news-card',
    templateUrl: './latest-news-card.component.html',
    styleUrls: ['./latest-news-card.component.scss']
})
export class LatestNewsCardComponent {
    @Input() page: WordpressPage;
    @Output() onArticleClicked: EventEmitter<null> = new EventEmitter<null>();

    onClick() {
        this.onArticleClicked.emit();
    }
}
