import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {QuestionType, QuestionTypeUtil} from "../question-type";
import {AllQuestionsContent} from "../../shared/question-content/all-questions-content";
import {Questionnaire} from "../base-questionnaire/questionnaire";
import groupBy from "lodash-es/groupBy";
import sortBy from "lodash-es/sortBy";
import head from "lodash-es/head";

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
    @Input() allQuestionsContent: AllQuestionsContent;
    @Input() questionnaire: Questionnaire;
    @Output() clickedOnLink: EventEmitter<number> = new EventEmitter();

    ngOnInit() {
        const allQuestions = this.questionnaire.getQuestions();
        const groupedQuestions = groupBy(allQuestions
            .map((question, i) => {
                const questionHeading = this.allQuestionsContent && this.allQuestionsContent[question.questionId]
                    && this.allQuestionsContent[question.questionId].questionHeading;
                return {
                    questionIndex: i,
                    questionHeading: questionHeading,
                    questionType: question.questionType
                }
            }), 'questionType');
        const sortedQuestions = sortBy(groupedQuestions, (questionGroup: QuestionStep[]) => head(questionGroup).questionIndex);

        this.questionnaireSections = sortedQuestions.map(questionGroup => {
            const questionType = head(questionGroup).questionType;
            return {
                questionType: questionType,
                questions: questionGroup,
                className: QuestionTypeUtil.getIconClassName(questionType)
            }
        });
        this.totalNumberOfIconsAndQuestions = allQuestions.length +
            ProgressIndicatorComponent.ICONS_PER_SECTION * this.questionnaireSections.length;
    }

    isAvailable(questionIndex: number) {
        return this.questionnaire.isAvailable(questionIndex);
    }

    isApplicable(questionIndex: number) {
        return this.questionnaire.isApplicable(questionIndex);
    }

    getTitleText(questionStep: QuestionStep) {
        const questionHeadingIfApplicable = questionStep.questionHeading ? `Go to ${questionStep.questionHeading}` : '';
        return this.isApplicable(questionStep.questionIndex) ?
            questionHeadingIfApplicable :
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