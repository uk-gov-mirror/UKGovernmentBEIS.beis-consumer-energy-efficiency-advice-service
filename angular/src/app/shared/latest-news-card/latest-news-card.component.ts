import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-latest-news-card',
    templateUrl: './latest-news-card.component.html',
    styleUrls: ['./latest-news-card.component.scss']
})
export class LatestNewsCardComponent {
    @Input() iconClassName: string;
    @Input() heading: string;
}
