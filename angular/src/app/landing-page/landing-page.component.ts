import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {QuestionContentService} from "../shared/question-content/question-content.service";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    constructor(private router: Router,
                private responseData: ResponseData,
                private questionContentService: QuestionContentService) {
    }

    @Input() heading: string;
    @Input() userJourneyType: UserJourneyType;

    questionContentError: boolean = false;
    postcodeQuestionReason: string;

    ngOnInit() {
        this.questionContentService.fetchQuestionsContent()
            .subscribe(questionsContent => this.postcodeQuestionReason = questionsContent['postcode_epc'].questionReason,
                (err) => {
                    console.log(err);
                    this.questionContentError = true;
                });
    }

    onAddressSelected() {
        this.responseData.userJourneyType = this.userJourneyType;
        this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
    }
}
