import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {OwnershipStatusQuestionComponent} from "./ownership-status-question.component";

export class OwnershipStatusQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            OwnershipStatusQuestionComponent,
            'ownership-status',
            QuestionType.User
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.homeowner !== undefined;
    }
}