import {QuestionContent} from './question-content';
import {QuestionResponse} from './question-response';

export class AllQuestionsContent {
    [questionId: string]: QuestionContent

    constructor(questionResponses: QuestionResponse[]) {
        questionResponses.forEach((questionResponse: QuestionResponse) => {
            this[questionResponse.slug] = questionResponse.acf;
        });
    }
}
