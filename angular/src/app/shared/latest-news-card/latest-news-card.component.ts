import {Component, Input} from "@angular/core";
import {AcfImage} from "../../page/page";

@Component({
    selector: 'app-latest-news-card',
    templateUrl: './latest-news-card.component.html',
    styleUrls: ['./latest-news-card.component.scss']
})
export class LatestNewsCardComponent {
    // TODO: Combine into single item when real articles will be used
    @Input() iconClassName: string;
    @Input() heading: string;
    @Input() image: AcfImage;
    @Input() readMoreRoute: string;
}
