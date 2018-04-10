import {WordpressSearchable} from '../wordpress-api-service/wordpress-searchable';
import {WordpressPageResponse} from './wordpress-page-response';
import {AcfImage} from './acf-image';

export class WordpressPage implements WordpressSearchable {
    route: string;
    title: string;
    coverImage?: AcfImage;
    videoEmbed: string;

    constructor(wordpressPageResponse: WordpressPageResponse) {
        this.route = '/pages/' + encodeURIComponent(wordpressPageResponse.slug);
        this.title = wordpressPageResponse.title.rendered;
        this.coverImage = wordpressPageResponse.acf.cover_image;
        this.videoEmbed = wordpressPageResponse.acf.video_embed;
    }
}
