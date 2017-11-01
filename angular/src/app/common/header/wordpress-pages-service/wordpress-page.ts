import {WordpressPageResponse} from './wordpress-page-response';

export class WordpressPage {
    public title: string;
    public slug: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.title = wordpressPageResponse.title.rendered;
        this.slug = wordpressPageResponse.slug;
    }
}