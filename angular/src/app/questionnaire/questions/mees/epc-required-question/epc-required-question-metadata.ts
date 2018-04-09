import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcRequiredQuestionComponent} from './epc-required-question.component';

export class EpcRequiredQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            EpcRequiredQuestionComponent,
            'epc-required',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.isDomesticPropertyAfter2018 || responseData.isPropertyAfter2020;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isEpcRequired != null;
    }
}
