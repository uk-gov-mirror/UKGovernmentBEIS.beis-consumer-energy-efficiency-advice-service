import {QuestionMetadata} from '../../base-question/question-metadata';
import {FridgeFreezerQuestionComponent} from './fridge-freezer-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';

export class FridgeFreezerQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            FridgeFreezerQuestionComponent,
            'fridge-freezers',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfFridgeFreezers !== undefined &&
               responseData.numberOfFridges !== undefined &&
               responseData.numberOfFreezers !== undefined;
    }
}
