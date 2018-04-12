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

    constructor(private router: Router,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        this.heading = getJourneyDescription(this.userJourneyType);
        this.responseData.reset();
    }

    onAddressSelected() {
        this.responseData.userJourneyType = this.userJourneyType;
        this.router.navigate(['/energy-efficiency/questionnaire/home-basics']);
    }
}
