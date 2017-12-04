import * as parse from "url-parse";
import {RecommendationStepResponse} from "../energy-saving-measure-content-service/recommendation-step-response";

export class RecommendationStep {
    headline: string;
    description: string;
    moreInfoLinks: {
        buttonText: string;
        route: string;
    }[];

    constructor(measureStep: RecommendationStepResponse) {
        this.headline = measureStep.headline;
        this.description = measureStep.description;
        this.moreInfoLinks = (measureStep.more_info_links || [])
            .map(link => {
                return {
                    buttonText: link.button_text,
                    route: parse(link.linked_page).pathname
                }
            })
    }
}