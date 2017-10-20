import {QuestionMetadata} from '../../base-question/question-metadata';
import {FlatPositionQuestionComponent} from './flat-position-question.component';
import {FlatPosition} from './flat-position';
import {ResponseData} from '../../../common/response-data/response-data';
import {isFlat, isTerraced} from '../home-type-question/home-type';
import {QuestionType} from '../../question-type';

export class FlatPositionQuestionMetadata extends QuestionMetadata<FlatPosition> {
    constructor() {
        super(
            FlatPositionQuestionComponent,
            'flat_position',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.homeType == null || isFlat(responseData.homeType) || isTerraced(responseData.homeType);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.flatPosition != null;
    }
}