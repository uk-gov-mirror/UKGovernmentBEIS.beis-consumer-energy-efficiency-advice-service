import {QuestionMetadata} from '../../../base-question/question-metadata';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {QuestionType} from '../../question-type';
import {LettingDomesticPropertyQuestionComponent} from './letting-domestic-property-question.component';

export class LettingDomesticPropertyQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LettingDomesticPropertyQuestionComponent,
            'letting-domestic-property',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return true;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.lettingDomesticPropertyStage !== undefined;
    }
}
