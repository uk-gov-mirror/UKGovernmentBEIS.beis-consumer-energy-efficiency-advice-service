import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {TemporaryExclusionsQuestionComponent} from './temporary-exclusions-question.component';

export class TemporaryExclusionsQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            TemporaryExclusionsQuestionComponent,
            'temporary-exclusions',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true; // TODO
        // return responseData.homeType == null ||
        //     (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasTemporaryExclusions != null;
    }
}
