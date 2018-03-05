import {LocalGrantResponse} from '../../shared/local-authority-service/local-authority-response';
import {GrantEligibility} from '../grant-eligibility-service/grant-eligibility';
import {RecommendationStep} from '../../shared/recommendations-service/recommendation-step';
import {Grant} from './grant';

export class LocalAuthorityGrant implements Grant {
    public grantId: string;
    public name: string;
    public description: string;
    public eligibility: GrantEligibility = GrantEligibility.MayBeEligible;
    public steps: RecommendationStep[] = [];

    constructor(localGrantResponse: LocalGrantResponse) {
        this.grantId = localGrantResponse.slug;
        this.name = localGrantResponse.display_name;
        this.description = localGrantResponse.description;
    }
}
