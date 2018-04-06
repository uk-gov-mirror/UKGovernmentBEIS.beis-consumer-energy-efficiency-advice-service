import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {PropertyAfter2020QuestionComponent} from "./property-after-2020-question.component";

export class PropertyAfter2020QuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            PropertyAfter2020QuestionComponent,
            'property-after-2020',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return !responseData.isDomesticPropertyAfter2018;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isPropertyAfter2020 !== undefined;
    }
}
