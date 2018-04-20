export interface RecommendationStepResponse {
    headline: string;
    description: string;
    read_more: string;
    more_info_links: {
        button_text: string;
        page_link: string;
    }[];
}
