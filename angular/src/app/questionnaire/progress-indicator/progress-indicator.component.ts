import * as _ from 'lodash';
import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireService} from '../questions/questionnaire.service';
import {QuestionType, QuestionTypeUtil} from '../question-type';
import {QuestionMetadata} from "../base-question/question-metadata";
import {ResponseData} from "../../response-data/response-data";

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

    constructor(private questionService: QuestionnaireService, private responseData: ResponseData) {
    }

    ngOnInit() {
        const allQuestions = this.questionService.getQuestions();
        this.questionnaireSections = _.chain(allQuestions)
            .map((question, i) => {
                return {
                    questionIndex: i,
                    question: question
                }
            })
            .groupBy(questionStep => questionStep.question.questionType)
            .sortBy((questionGroup: QuestionStep[]) => _.head(questionGroup).questionIndex)
            .map(questionGroup => {
                const questionType = _.head(questionGroup).question.questionType;
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

    isApplicable(questionStep: QuestionStep) {
        return questionStep.question.isApplicable(this.responseData);
    }
}

interface QuestionnaireSection {
    questionType: QuestionType;
    questions: QuestionStep[];
    className: string;
}

interface QuestionStep {
    questionIndex: number;
    question: QuestionMetadata<any>;
}