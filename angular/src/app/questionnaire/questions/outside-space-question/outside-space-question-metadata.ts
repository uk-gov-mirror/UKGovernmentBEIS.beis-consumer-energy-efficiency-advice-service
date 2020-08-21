import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {OutsideSpaceQuestionComponent} from "./outside-space-question.component";

export class OutsideSpaceQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            OutsideSpaceQuestionComponent,
            'outside_space',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.hasOutsideSpace !== undefined;
    }
}
