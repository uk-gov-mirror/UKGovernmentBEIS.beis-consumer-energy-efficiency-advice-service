import {AcfPageResponse} from "./acf-page-response";

export interface MeasureMetadataResponse {
    acf: {
        rdsap_measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        linked_pages: AcfPageResponse[]
    }
}