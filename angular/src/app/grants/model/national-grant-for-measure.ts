import {Grant} from './grant';
import {GrantEligibility} from '../grant-eligibility-service/grant-eligibility';
import {RecommendationStep} from '../../shared/recommendations-service/recommendation-step';
import {NationalGrantContent} from '../national-grants-content-service/national-grants-content';

export class NationalGrantForMeasure implements Grant {
    grantId: string;
    name: string;
    description: string;
    findOutMoreLink: string;
    steps: RecommendationStep[];

    constructor(
        nationalGrantContent: NationalGrantContent,
        public eligibility: GrantEligibility,
        public annualPaymentPoundsForMeasure: number,
    ) {
        this.grantId = nationalGrantContent.slug;
        this.name = nationalGrantContent.heading;
        this.description = nationalGrantContent.description;
        this.findOutMoreLink = nationalGrantContent.find_out_more_link;
        this.steps = nationalGrantContent.steps && nationalGrantContent.steps
                .map(stepResponse => new RecommendationStep(stepResponse));
    }
}
