import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {OwnHomeQuestionComponent} from "./own-home-question.component";

export class OwnHomeQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            OwnHomeQuestionComponent,
            'own_home',
            QuestionType.House
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.ownsHome !== undefined;
    }
}
