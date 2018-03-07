import {QuestionMetadata} from '../../base-question/question-metadata';
import {HouseExposedWallQuestionComponent} from './house-exposed-wall-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {QuestionType} from '../question-type';
import {HomeType, isDetached} from '../home-type-question/home-type';

export class HouseExposedWallQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HouseExposedWallQuestionComponent,
            'house_exposed_wall',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.homeType == null ||
            (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfExposedWallsInHouse != null;
    }
}
