import {RecommendationTagJsonName} from
    '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {RecommendationStepResponse} from './recommendation-step-response';

// This is used for the your-home-component
export interface RawMeasureContent  {
    slug: string;
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        advantages: {advantage: string}[];
        tags: string[],
        steps: RecommendationStepResponse[]
    };
}

// This is used for the recommendations
export interface MeasureContent extends RawMeasureContent {
    slug: string;
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        featured_page: string;
        advantages: {advantage: string}[];
        tags: RecommendationTagJsonName[],
        steps: RecommendationStepResponse[]
    };
}
