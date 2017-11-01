import {Component, Input} from "@angular/core";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

@Component({
    selector: 'app-further-questions-link',
    templateUrl: './further-questions-link.component.html',
    styleUrls: ['./further-questions-link.component.scss']
})
export class FurtherQuestionsLinkComponent {
    @Input() iconClassName: string;
    @Input() questionnaireName: string;
    @Input() displayName: string;

    questionnaireComplete: boolean;

    constructor(private questionnaireService: QuestionnaireService) {
    }

    ngOnInit() {
        this.questionnaireComplete = this.questionnaireService.isComplete(this.questionnaireName);
    }

    linkToQuestionnaire(questionnaireName: string): string {
        return '/questionnaire/' + questionnaireName;
    }
}
