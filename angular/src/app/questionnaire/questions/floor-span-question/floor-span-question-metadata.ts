import {QuestionMetadata} from '../../base-question/question-metadata';
import {FloorSpanQuestionComponent} from './floor-span-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HomeType} from '../home-type-question/home-type';

export class FloorSpanQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FloorSpanQuestionComponent,
            'floor_span',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.epc === undefined &&
            ((responseData.homeType === HomeType.FlatDuplexOrMaisonette && responseData.numberOfStoreys !== 1) ||
            responseData.homeType === undefined ||
            responseData.numberOfStoreys === undefined);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.floorLevels !== undefined;
    }
}
