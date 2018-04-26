import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../shared/response-data/response-data';
import {getJourneyDescription, UserJourneyType} from '../shared/response-data/user-journey-type';
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {Article} from './article-card/article';
import {Video} from '../shared/large-video-card/video';
import * as log from 'loglevel';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

    @Input() userJourneyType: UserJourneyType;
    @Input() video: Video;
    @Input() articles: Article[];

    isLoading: boolean;
    isError: boolean;
    heading: string;
    tag: string;
    measures: MeasureContent[];
    postcode: string;

    constructor(private router: Router,
                private responseData: ResponseData,
                private measureService: EnergySavingMeasureContentService) {
        this.isLoading = true;
        this.isError = false;
    }

    ngOnInit() {
        this.heading = getJourneyDescription(this.userJourneyType);
        this.tag = this.getTagFromUserJourneyType();

        this.measureService.fetchMeasureDetailsForLandingPage(this.tag, 2).subscribe(
            measures => {
                this.measures = measures;
                this.isLoading = false;
            },
            () => this.displayErrorAndLogMessage('No measures found for ${this.heading}')
        );
    }

    onPostcodeSelected() {
        this.postcode = this.responseData.postcode;
    }

    onEpcSelected() {
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

    private displayErrorAndLogMessage(err: any) {
        log.error(err);
        this.isLoading = false;
        this.isError = true;
    }
}
