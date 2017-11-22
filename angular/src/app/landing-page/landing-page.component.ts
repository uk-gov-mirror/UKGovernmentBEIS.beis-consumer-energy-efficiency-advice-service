import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ResponseData} from "../shared/response-data/response-data";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {PostcodeEpcService} from "../shared/postcode-epc-service/postcode-epc.service";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {AllQuestionsContent} from "../shared/question-content/all-questions-content";

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
    postcodeInput: string;
    validationError: boolean = false;

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

    onPostcodeSubmit() {
        this.postcodeInput = this.postcodeInput.trim();
        if (!(this.validationError = !PostcodeEpcService.isValidPostcode(this.postcodeInput))) {
            this.responseData.postcode = this.postcodeInput;
            this.responseData.userJourneyType = this.userJourneyType;
            this.router.navigate(['/js/energy-efficiency/questionnaire/home-basics']);
        }
    }
}
