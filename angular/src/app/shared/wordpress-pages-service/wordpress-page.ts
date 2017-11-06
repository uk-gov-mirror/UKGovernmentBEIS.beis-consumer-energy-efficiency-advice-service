import {WordpressPageResponse} from "./wordpress-page-response";
import {WordpressPageRoutingService} from "./wordpress-page-routing.service";

export class WordpressPage {
    public route: string;
    public title: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.route = WordpressPageRoutingService.getRouteForWordpressUrl(wordpressPageResponse.link);
        this.title = wordpressPageResponse.title.rendered;
    }
}
