import {QuestionMetadata} from '../../base-question/question-metadata';
import {LivingRoomTemperatureQuestionComponent} from './living-room-temperature-question.component';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';

export class LivingRoomTemperatureQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            LivingRoomTemperatureQuestionComponent,
            'living-room-temperature',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.livingRoomTemperature !== undefined;
    }
}
