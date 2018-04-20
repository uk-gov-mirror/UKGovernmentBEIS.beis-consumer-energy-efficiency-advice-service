import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../shared/response-data/response-data';
import {getJourneyDescription, UserJourneyType} from '../shared/response-data/user-journey-type';
import {StaticMeasure} from './static-measure-card/static-measure';
import {Article} from './article-card/article';
import {Video} from '../shared/large-video-card/video';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    @Input() userJourneyType: UserJourneyType;
    @Input() staticMeasures: StaticMeasure[];
    @Input() video: Video;
    @Input() articles: Article[];

    postcodeQuestionReason: string;
    heading: string;
    tag: string;

    constructor(private router: Router,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        this.heading = getJourneyDescription(this.userJourneyType);
        this.tag = this.getTagFromUserJourneyType();
    }

    onAddressSelected() {
        this.responseData.userJourneyType = this.userJourneyType;
        this.router.navigate(['/energy-efficiency/questionnaire/home-basics']);
    }

    getTagFromUserJourneyType() {
        switch (this.userJourneyType) {
            case UserJourneyType.MakeHomeGreener:       { return 'tag_make_home_greener'; }
            case UserJourneyType.PlanHomeImprovements:  { return 'tag_home_improvements'; }
            case UserJourneyType.ReduceEnergyBills:     { return 'tag_reduce_bills'; }
            case UserJourneyType.MakeHomeWarmer:        { return 'tag_make_home_warmer'; }
            default:                                    { return null; }
        }
    }
}
