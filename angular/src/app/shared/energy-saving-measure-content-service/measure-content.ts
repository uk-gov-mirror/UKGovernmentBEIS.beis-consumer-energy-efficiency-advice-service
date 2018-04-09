import {RecommendationStepResponse} from './recommendation-step-response';

export interface MeasureContent  {
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
