import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcNotFoundComponent} from './epc-not-found.component';

export class EpcNotFoundMetadata extends QuestionMetadata {
    constructor() {
        super(
            EpcNotFoundComponent,
            'epc-not-found',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return !!responseData.postcode && !responseData.epc;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.confirmEpcNotFound !== undefined;
    }
}
