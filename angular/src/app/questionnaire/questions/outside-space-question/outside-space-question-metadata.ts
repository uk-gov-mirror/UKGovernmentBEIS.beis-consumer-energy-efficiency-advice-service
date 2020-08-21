import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {OutsideSpaceQuestionComponent} from "./outside-space-question.component";
import {GardenAccessibility} from "../garden-question/garden-accessibility";

export class OutsideSpaceQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            OutsideSpaceQuestionComponent,
            'outside_space',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.gardenAccessibility !== GardenAccessibility.Accessible;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasOutsideSpace !== undefined;
    }
}
