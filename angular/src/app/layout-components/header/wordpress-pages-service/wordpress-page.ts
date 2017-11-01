import {WordpressPageResponse} from './wordpress-page-response';
import {UrlParser} from '../../url-parser/url-parser';

export class WordpressPage {
    public path: string;
    public title: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.path = UrlParser.getUrlPath(wordpressPageResponse.link);
        this.title = wordpressPageResponse.title.rendered;
    }
}