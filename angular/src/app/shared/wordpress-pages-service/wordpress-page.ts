import {WordpressPageResponse} from './wordpress-page-response';
import * as parse from 'url-parse';
import {AcfImage} from './acf-image';

export class WordpressPage {
    route: string;
    title: string;
    coverImage?: AcfImage;
    videoEmbed: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.route = parse(wordpressPageResponse.link).pathname;
        this.title = wordpressPageResponse.title.rendered;
        this.coverImage = wordpressPageResponse.acf.cover_image;
        this.videoEmbed = wordpressPageResponse.acf.video_embed;
    }
}
