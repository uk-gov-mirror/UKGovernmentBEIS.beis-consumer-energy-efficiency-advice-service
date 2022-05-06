import {AcfImage} from './acf-image';

export interface WordpressPageResponse {
    slug: string;
    title: PageContent;
    content: PageContent;
    excerpt: PageContent;
    acf: {
        cover_image?: AcfImage,
        video_embed: string,
        tags: string[];
    };
}

export interface PageContent {
    rendered: string;
}
