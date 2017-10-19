import {QuestionMetadata} from '../../base-question/question-metadata';
import {FuelType} from './fuel-type';
import {FuelTypeQuestionComponent} from './fuel-type-question.component';
import {QuestionType} from '../../question-type';

export class FuelTypeQuestionMetadata extends QuestionMetadata<FuelType> {
    constructor() {
        super(
            FuelTypeQuestionComponent,
            'Which type of fuel supplies your heating?',
            QuestionType.Heating
        );
    }

    isApplicable(): boolean {
        return true;
    }
}
