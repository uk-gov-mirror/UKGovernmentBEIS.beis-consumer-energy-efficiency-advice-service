import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {EpcBelowEQuestionComponent} from './epc-below-e-question.component';

export class EpcBelowEQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            EpcBelowEQuestionComponent,
            'epc-below-e',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true; // TODO
        // return responseData.homeType == null ||
        //     (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isEpcBelowE != null;
    }
}
