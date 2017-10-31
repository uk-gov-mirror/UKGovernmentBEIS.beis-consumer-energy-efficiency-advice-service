import {WordpressPageResponse} from './wordpress-page-response';
import {unescape} from 'lodash-es';

export class WordpressPage {
    public title: string;
    public slug: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.title = WordpressPage.decodeEscapedAsciiChars(wordpressPageResponse.title.rendered);
        this.slug = wordpressPageResponse.slug;
    }

    private static decodeEscapedAsciiChars(input: string) {
        // return input.replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n));
        return unescape(input);
    }
}