import {AcfPageResponse} from "./acf-page-response";
import {RecommendationTagJsonName} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";

export interface MeasureContent {
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        linked_pages: AcfPageResponse[];
        advantages: string;
        tags: RecommendationTagJsonName[]
    }
}