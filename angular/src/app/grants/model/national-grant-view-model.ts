import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";
import {RecommendationStep} from "../../energy-efficiency/recommendations/recommendation-step";

export class NationalGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public shouldDisplayWithoutMeasures: boolean;
    public linkedMeasureCodes: string[];
    public advantages: string[];
    public grantId: string;
    public steps: RecommendationStep[];

    constructor(
        nationalGrantContent: NationalGrantContent,
        public eligibility: GrantEligibility,
        public annualPaymentPounds: number
    ) {
        this.name = nationalGrantContent.heading;
        this.description = nationalGrantContent.description;
        this.shouldDisplayWithoutMeasures = nationalGrantContent.display_without_measures;
        this.linkedMeasureCodes = nationalGrantContent.linked_measure_codes;
        this.advantages = nationalGrantContent.advantages &&
            nationalGrantContent.advantages.match(/[^\r\n]+/g);
        this.grantId = nationalGrantContent.slug;
        this.steps = nationalGrantContent.steps && nationalGrantContent.steps
            .map(stepResponse => new RecommendationStep(stepResponse));
    }
}