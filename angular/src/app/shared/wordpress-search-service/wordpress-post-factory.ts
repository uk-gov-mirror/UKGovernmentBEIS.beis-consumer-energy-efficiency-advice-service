import {WordpressPage} from '../wordpress-pages-service/wordpress-page';
import {WordpressMeasure} from '../wordpress-measures-service/wordpress-measure';

export class WordpressPostFactory {
    static create(searchResponse: any) {
        switch (searchResponse.type) {
            case 'page':
                return new WordpressPage(searchResponse);
            case 'measure':
                return new WordpressMeasure(searchResponse);
            default:
                throw new Error(`Unknown post type: ${searchResponse.type}`);
        }
    }
}
