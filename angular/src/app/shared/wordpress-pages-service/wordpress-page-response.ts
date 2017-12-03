import {AcfImage} from "./acf-image";

export interface WordpressPageResponse {
    link: string;
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