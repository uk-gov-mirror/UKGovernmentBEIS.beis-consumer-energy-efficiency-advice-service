import {RecommendationTagJsonName} from
    '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {RecommendationStepResponse} from './recommendation-step-response';

export interface MeasureContent {
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
