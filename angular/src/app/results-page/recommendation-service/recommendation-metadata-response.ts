import {AcfPageResponse} from "./acf-page-response";

export interface RecommendationMetadataResponse {
    acf: {
        rdsap_measure_code: string;
        headline: string;
        featured_page: string;
        linked_pages: AcfPageResponse[]
    }
}