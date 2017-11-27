import {AcfPageResponse} from "./acf-page-response";

export interface MeasureContent {
    measure_code: string;
    headline: string;
    summary: string;
    featured_page: string;
    linked_pages: AcfPageResponse[];
    advantages: string;
    tags: string[]
}