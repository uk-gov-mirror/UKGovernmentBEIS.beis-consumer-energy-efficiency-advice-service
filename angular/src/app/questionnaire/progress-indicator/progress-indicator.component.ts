import * as _ from "lodash";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {QuestionnaireService} from "../questions/questionnaire.service";
import {QuestionType, QuestionTypeUtil} from "../question-type";

@Component({
    selector: 'progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

    private static readonly ICONS_PER_SECTION = 1;

    questionnaireSections: QuestionnaireSection[];
    private totalNumberOfIconsAndQuestions: number;
    @Input() currentQuestionIndex: number;
    @Output() clickedOnLink: EventEmitter<number> = new EventEmitter();

    constructor(private questionnaireService: QuestionnaireService) {
    }

    ngOnInit() {
        const allQuestions = this.questionnaireService.getQuestions();
        this.questionnaireSections = _.chain(allQuestions)
            .map((question, i) => {
                return {
                    questionIndex: i,
                    questionHeading: question.heading,
                    questionType: question.questionType
                }
            })
            .groupBy('questionType')
            .sortBy((questionGroup: QuestionStep[]) => _.head(questionGroup).questionIndex)
            .map(questionGroup => {
                const questionType = _.head(questionGroup).questionType;
                return {
                    questionType: questionType,
                    questions: questionGroup,
                    className: QuestionTypeUtil.getIconClassName(questionType)
                }
            })
            .value();
        this.totalNumberOfIconsAndQuestions = allQuestions.length +
            ProgressIndicatorComponent.ICONS_PER_SECTION * this.questionnaireSections.length;
    }

    isAvailable(questionIndex: number) {
        return this.questionnaireService.isAvailable(questionIndex);
    }

    isApplicable(questionIndex: number) {
        return this.questionnaireService.isApplicable(questionIndex);
    }

    getTitleText(questionStep: QuestionStep) {
        return this.isApplicable(questionStep.questionIndex) ?
            `Go to ${questionStep.questionHeading}` :
            'This question is not applicable to your home';
    }

    getFlexBasis(questionTypeSection: QuestionnaireSection) {
        const questionsAndIconsInThisSection = ProgressIndicatorComponent.ICONS_PER_SECTION + questionTypeSection.questions.length;
        return 100 * questionsAndIconsInThisSection / this.totalNumberOfIconsAndQuestions + '%';
    }
}

interface QuestionnaireSection {
    questionType: QuestionType;
    questions: QuestionStep[];
    className: string;
}

interface QuestionStep {
    questionIndex: number;
    questionType: QuestionType;
    questionHeading: string
}