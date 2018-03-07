import {WordpressPage} from './wordpress-page';
import {WordpressPageResponse} from './wordpress-page-response';

export class ExtendedWordpressPage extends WordpressPage {
    content: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        super(wordpressPageResponse);
        this.content = wordpressPageResponse.content.rendered;
    }
}
