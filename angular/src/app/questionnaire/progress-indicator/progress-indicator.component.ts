import * as _ from 'lodash';
import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireService} from '../questions/questionnaire.service';
import {QuestionType, QuestionTypeUtil} from '../question-type';

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

    constructor(private questionService: QuestionnaireService) {
    }

    ngOnInit() {
        const allQuestions = this.questionService.getQuestions();
        this.questionnaireSections = _.chain(allQuestions)
            .map((question, i) => {
                return {
                    questionIndex: i,
                    questionType: question.questionType
                }
            })
            .groupBy('questionType')
            .sortBy((questionGroup: {questionIndex: number, questionType: QuestionType}[]) => _.head(questionGroup).questionIndex)
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