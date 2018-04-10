import {WordpressSearchable} from '../wordpress-api-service/wordpress-searchable';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {RecommendationStep} from '../recommendations-service/recommendation-step';

export class WordpressMeasure implements WordpressSearchable {
    route: string;
    title: string;
    summary: string;
    advantages: string[];
    steps: RecommendationStep[];

    constructor(wordpressMeasureResponse: MeasureContent) {
        this.route = '/measures/' + encodeURIComponent(wordpressMeasureResponse.slug);
        this.title = wordpressMeasureResponse.acf.headline;
        this.summary = wordpressMeasureResponse.acf.summary;
        this.advantages = wordpressMeasureResponse.acf.advantages
            && wordpressMeasureResponse.acf.advantages.map(x => x.advantage);
        this.steps = wordpressMeasureResponse.acf.steps && wordpressMeasureResponse.acf.steps
            .map(stepResponse => new RecommendationStep(stepResponse));
    }
}
