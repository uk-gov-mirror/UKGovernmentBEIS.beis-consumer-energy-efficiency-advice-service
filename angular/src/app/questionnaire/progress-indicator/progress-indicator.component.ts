import * as _ from 'lodash';
import { Component, Input } from '@angular/core';
import { QuestionService } from '../questions/question.service';
import { QuestionType, QuestionTypeUtil } from '../question-type';

@Component({
    selector: 'progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent {

    private static readonly ICONS_PER_SECTION = 1;

    questionnaireSections: QuestionnaireSection[];
    private totalNumberOfIconsAndQuestions: number;
    @Input() currentQuestionIndex: number;

    constructor(private questionService: QuestionService) {
    }

    ngOnInit() {
        this.questionnaireSections = _.chain(this.questionService.getQuestions())
            .map((question, i) => {
                return {
                    questionIndex: i,
                    questionType: question.questionType
                }
            })
            .groupBy('questionType').values()
            .sortBy(questionGroup => _.head(questionGroup).questionIndex)
            .map(questionGroup => {
                const questionType = _.head(questionGroup).questionType;
                return {
                    questionType: questionType,
                    questions: questionGroup,
                    className: QuestionTypeUtil.getIconClassName(questionType)
                }
            })
            .value();
        this.totalNumberOfIconsAndQuestions = this.questionService.numberOfQuestions +
            ProgressIndicatorComponent.ICONS_PER_SECTION * this.questionnaireSections.length;
    }

    getFlexBasis(questionTypeSection: QuestionnaireSection) {
        const questionsAndIconsInThisSection = ProgressIndicatorComponent.ICONS_PER_SECTION + questionTypeSection.questions.length;
        return 100 * questionsAndIconsInThisSection / this.totalNumberOfIconsAndQuestions + '%';
    }
}

interface QuestionnaireSection {
    questionType: QuestionType;
    questions: {questionIndex: number}[];
    className: string;
}