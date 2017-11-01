export interface RecommendationMetadataResponse {
    acf: {
        rdsap_measure_code: string;
        headline: string;
        featured_page: string;
        linked_pages: {
            post_name: string;
            post_title: string;
        }[]
    }
}