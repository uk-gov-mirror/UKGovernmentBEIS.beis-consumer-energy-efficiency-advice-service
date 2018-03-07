import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GrantsQuestionnaireQuestionComponent} from './grants-questionnaire-question.component';

export class GrantsQuestionnaireQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            GrantsQuestionnaireQuestionComponent,
            'grants-questionnaire',
            QuestionType.Behaviour
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire !== undefined;
    }
}
