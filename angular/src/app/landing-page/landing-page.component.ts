import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {getJourneyDescription, UserJourneyType} from "../shared/response-data/user-journey-type";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {WordpressPagesService} from "../shared/wordpress-pages-service/wordpress-pages.service";
import {WordpressPage} from "../shared/wordpress-pages-service/wordpress-page";
import {Observable} from "rxjs/Observable";
import {StaticMeasure} from "./static-measure-card/static-measure";
import {Article} from "./article-card/article";
import {Video} from "../shared/large-video-card/video";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    constructor(private router: Router,
                private responseData: ResponseData,
                private questionContentService: QuestionContentService,
                private pageService: WordpressPagesService) {
    }

    @Input() userJourneyType: UserJourneyType;
    @Input() staticMeasures: StaticMeasure[];
    @Input() video: Video;
    @Input() articles: Article[];

    questionContentError: boolean = false;
    postcodeQuestionReason: string;
    heading: string;
    latestNews: WordpressPage[];

    ngOnInit() {
        this.questionContentService.fetchQuestionsContent()
            .subscribe(questionsContent => this.postcodeQuestionReason = questionsContent['postcode_epc'].questionReason,
                (err) => {
                    console.log(err);
                    this.questionContentError = true;
                });
        this.pageService.getLatestPages()
            .subscribe(pages => this.latestNews = pages);

        this.heading = getJourneyDescription(this.userJourneyType);
    }

    onAddressSelected() {
        this.responseData.userJourneyType = this.userJourneyType;
        this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
    }
}
