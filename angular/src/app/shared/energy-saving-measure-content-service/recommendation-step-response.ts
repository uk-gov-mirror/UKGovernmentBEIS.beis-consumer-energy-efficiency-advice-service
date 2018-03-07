export interface RecommendationStepResponse {
    headline: string;
    description: string;
    read_more: string;
    more_info_links: {
        button_text: string;
        is_external_link: boolean;
        linked_page: string;
        external_link: string;
    }[];
}
