export interface RecommendationStepResponse {
    headline: string;
    description: string;
    more_info_links: {
        button_text: string;
        linked_page: string;
    }[]
}