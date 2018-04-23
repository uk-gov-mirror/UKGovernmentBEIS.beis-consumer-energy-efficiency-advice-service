import {RecommendationStepResponse} from '../energy-saving-measure-content-service/recommendation-step-response';
import {WordpressPagesService} from "../wordpress-pages-service/wordpress-pages.service";

export class RecommendationStep {
    headline: string;
    description: string;
    readMore: string;
    moreInfoLinks: {
        buttonText: string;
        linkProps: {
            route: string;
            isRelativeURL: boolean;
        }
    }[];

    constructor(measureStep: RecommendationStepResponse) {
        this.headline = measureStep.headline;
        this.description = measureStep.description;
        this.readMore = measureStep.read_more;
        this.moreInfoLinks = (measureStep.more_info_links || [])
            .map(link => {
                return {
                    buttonText: link.button_text,
                    // The linked_page is a Wordpress Post URL, like:
                    //   http://admin-site/category/slug
                    linkProps: WordpressPagesService.getRouteForPageFromUrl(link.link_url),
                };
            });
    }
}
