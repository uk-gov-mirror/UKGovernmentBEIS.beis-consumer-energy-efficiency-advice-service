import {AcfImage} from './acf-image';

export interface WordpressPageResponse {
    slug: string;
    title: PageContent;
    content: PageContent;
    acf: {
        cover_image?: AcfImage,
        video_embed: string
    };
}

export interface PageContent {
    rendered: string;
}
