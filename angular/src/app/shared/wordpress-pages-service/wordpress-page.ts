import {WordpressPageResponse} from "./wordpress-page-response";
import * as parse from "url-parse";

export class WordpressPage {
    public route: string;
    public title: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.route = parse(wordpressPageResponse.link).pathname;
        this.title = wordpressPageResponse.title.rendered;
    }
}
