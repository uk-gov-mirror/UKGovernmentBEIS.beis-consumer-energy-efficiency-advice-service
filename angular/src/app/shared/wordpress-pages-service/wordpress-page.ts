import * as parse from "url-parse";
import {WordpressPageResponse} from "./wordpress-page-response";

export class WordpressPage {
    public path: string;
    public title: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.path = parse(wordpressPageResponse.link).pathname;
        this.title = wordpressPageResponse.title.rendered;
    }
}
