import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {DomesticPropertyAfter2018QuestionComponent} from './domestic-property-after-2018-question.component';

export class DomesticPropertyAfter2018QuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            DomesticPropertyAfter2018QuestionComponent,
            'domestic-property-after-2018',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true; // TODO
        // return responseData.homeType == null ||
        //     (!isDetached(responseData.homeType) && responseData.homeType !== HomeType.FlatDuplexOrMaisonette);
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.isDomesticPropertyAfter2018 != null;
    }
}
