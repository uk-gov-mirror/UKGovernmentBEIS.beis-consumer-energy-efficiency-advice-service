import {QuestionMetadata} from '../../base-question/question-metadata';
import {BedroomsQuestionComponent} from './bedrooms-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';

export class BedroomsQuestionMetadata extends QuestionMetadata {
    constructor(private ignoreEpc: boolean = false) {
        super(
            BedroomsQuestionComponent,
            'bedrooms',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return (responseData.epc === undefined) || this.ignoreEpc;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfBedrooms !== undefined;
    }
}
