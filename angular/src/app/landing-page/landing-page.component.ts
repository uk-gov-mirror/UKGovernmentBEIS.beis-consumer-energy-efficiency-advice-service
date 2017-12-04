import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {WordpressPagesService} from "../shared/wordpress-pages-service/wordpress-pages.service";
import {WordpressPage} from "../shared/wordpress-pages-service/wordpress-page";
import {Observable} from "rxjs/Observable";
import {StaticMeasure} from "./static-measure-card/static-measure";

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

    @Input() heading: string;
    @Input() userJourneyType: UserJourneyType;

    questionContentError: boolean = false;
    postcodeQuestionReason: string;
    staticMeasures: StaticMeasure[] = [
        {
            iconClassName: 'icon-lightbulb',
            basicInfoValue: '15%',
            basicInfoHeadline: 'of your electricity bill is accounted for by lighting',
            measureHeadline: 'Energy efficient lighting',
            measureSummary: 'You can cut your lighting bill and energy use by changing which bulbs you use and how you use them',
            averageSavings: 75
        },
        {
            iconClassName: 'icon-switch',
            basicInfoValue: '40%',
            basicInfoHeadline: 'of people could save money by switching energy suppliers',
            measureHeadline: 'Switching energy supplier',
            measureSummary: 'Comparing energy tariffs and deals regularly can help you make sure you’re getting the best gas or electricity tariff for your usage and the best service offer.',
            averageSavings: 30
        }
    ];
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
    }

    onAddressSelected() {
        this.responseData.userJourneyType = this.userJourneyType;
        this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
    }
}
