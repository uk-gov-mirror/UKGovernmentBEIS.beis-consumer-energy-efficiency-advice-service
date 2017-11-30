import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {WordpressPagesService} from "../shared/wordpress-pages-service/wordpress-pages.service";
import {WordpressPage} from "../shared/wordpress-pages-service/wordpress-page";
import {Observable} from "rxjs/Observable";

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
    latestNews: WordpressPage[];
    // TODO: Remove fake icon code
    readonly pageIcons: string[] = ['icon-video-play', 'icon-infographic', 'icon-checklist', 'icon-grant'];

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
