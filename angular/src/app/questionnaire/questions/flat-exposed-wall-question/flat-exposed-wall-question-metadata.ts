import {QuestionMetadata} from '../../base-question/question-metadata';
import {FlatExposedWallQuestionComponent} from './flat-exposed-wall-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HomeType} from '../home-type-question/home-type';
import {QuestionType} from '../question-type';

export class FlatExposedWallQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FlatExposedWallQuestionComponent,
            'flat_exposed_wall',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.epc === undefined &&
            (responseData.homeType == null || responseData.homeType === HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfExposedWallsInFlat != null;
    }
}
