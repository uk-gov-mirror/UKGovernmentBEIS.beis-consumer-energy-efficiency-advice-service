import {AcfPageResponse} from "./acf-page-response";

export interface MeasureContent {
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        linked_pages: AcfPageResponse[];
        advantages: string;
        tag_quick_win: boolean;
        tag_small_spend: boolean;
        tag_longer_term: boolean;
    }
}