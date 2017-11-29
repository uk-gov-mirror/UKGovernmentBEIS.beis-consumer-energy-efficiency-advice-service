export interface Page {
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

export interface AcfImage {
    url: string;
    alt: string;
}