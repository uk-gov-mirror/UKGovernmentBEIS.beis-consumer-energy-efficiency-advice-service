import {QuestionMetadata} from "../../base-question/question-metadata";
import {Country} from "../postcode-epc-question/country";
import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionBaseComponent} from "../../base-question/question-base-component";
import {QuestionType} from "../question-type";
import { Type } from "@angular/core";

export class EnglandOnly implements QuestionMetadata {
    public readonly componentType: Type<QuestionBaseComponent>;
    public readonly questionId: string;
    public readonly questionType: QuestionType;

    constructor(private wrappedQuestionMetadata: QuestionMetadata) {
        this.componentType = wrappedQuestionMetadata.componentType;
        this.questionId = wrappedQuestionMetadata.questionId;
        this.questionType = wrappedQuestionMetadata.questionType;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return this.wrappedQuestionMetadata.hasBeenAnswered(responseData);
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.country === Country.England
            && this.wrappedQuestionMetadata.isApplicable(responseData);
    }
}
