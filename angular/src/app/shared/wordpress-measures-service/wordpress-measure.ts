import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {RecommendationStep} from '../recommendations-service/recommendation-step';
import {WordpressSearchable} from '../wordpress-search-service/wordpress-searchable';

export class WordpressMeasure implements WordpressSearchable {
    route: string;
    title: string;
    summary: string;
    advantages: string[];
    steps: RecommendationStep[];
    tags: string[];

    get descriptionHtml() {
        return `<p>${this.summary}</p>`;
    }

    constructor(wordpressMeasureResponse: MeasureContent) {
        this.route = '/measures/' + encodeURIComponent(wordpressMeasureResponse.slug);
        this.title = wordpressMeasureResponse.acf.headline;
        this.summary = wordpressMeasureResponse.acf.summary;
        this.advantages = wordpressMeasureResponse.acf.advantages
            && wordpressMeasureResponse.acf.advantages.map(x => x.advantage);
        this.steps = wordpressMeasureResponse.acf.steps && wordpressMeasureResponse.acf.steps
            .map(stepResponse => new RecommendationStep(stepResponse));
        this.tags = wordpressMeasureResponse.acf.tags;
    }
}
