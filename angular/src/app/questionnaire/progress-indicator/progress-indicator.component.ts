import { Component, Input } from '@angular/core';
import {QuestionService} from '../questions/question.service';
import {QuestionType, QuestionTypeUtil} from '../question-type';
import {Question} from '../questions/question';
import {QuestionBaseComponent} from '../questions/question.component';

@Component({
    selector: 'progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent {

    private readonly questionnaireSections: QuestionnaireSection[];
    @Input() currentQuestionIndex: number;

    constructor(private questionService: QuestionService) {
        const allQuestions = Array.from(Array(questionService.numberOfQuestions).keys())
            .map(questionIndex => {
                return {
                    questionIndex: questionIndex,
                    questionType: questionService.getQuestionType(questionIndex)
                }
            });
        this.questionnaireSections = allQuestions.reduce((result, question) => {
            const questionSectionIndex = result.findIndex(section => section.questionType === question.questionType);
            if (questionSectionIndex < 0) {
                const questionSection = {
                    questionType: question.questionType,
                    questions: [question],
                    className: QuestionTypeUtil.getIconClassName(question.questionType)
                };
                result.push(questionSection);
            } else {
                result[questionSectionIndex].questions.push(question);
            }
            return result;
        }, []);
    }

    getFlexBasis(questionTypeSection: QuestionnaireSection) {
        const iconsPerSection = 1;
        const questionsAndIconsInThisSection = iconsPerSection + questionTypeSection.questions.length;
        const totalIconsAndQuestions = this.questionService.numberOfQuestions + iconsPerSection * this.questionnaireSections.length;
        return 100 * questionsAndIconsInThisSection / totalIconsAndQuestions + '%';
    }
}

interface QuestionnaireSection {
    questionType: QuestionType;
    questions: {questionIndex: number}[];
    className: string;
}