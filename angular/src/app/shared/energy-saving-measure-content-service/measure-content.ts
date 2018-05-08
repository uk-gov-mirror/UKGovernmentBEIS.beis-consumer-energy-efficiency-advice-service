import {RecommendationStepResponse} from './recommendation-step-response';

export interface MeasureContent  {
    slug: string;
    acf: {
        measure_code: string;
        headline: string;
        summary: string;
        advantages: {advantage: string}[];
        statistic: string;
        tags: string[],
        steps: RecommendationStepResponse[]
    };
}
