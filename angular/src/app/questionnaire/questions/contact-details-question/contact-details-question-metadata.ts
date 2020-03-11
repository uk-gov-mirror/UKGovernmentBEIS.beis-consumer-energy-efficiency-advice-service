import {QuestionMetadata} from '../../base-question/question-metadata';
import {ContactDetailsQuestionComponent} from './contact-details-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';

export class ContactDetailsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            ContactDetailsQuestionComponent,
            'contact-details',
            QuestionType.Personal
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasValidContactDetails;
    }
}
