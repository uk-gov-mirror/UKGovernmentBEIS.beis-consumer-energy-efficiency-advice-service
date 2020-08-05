import {QuestionMetadata} from "../base-question/question-metadata";
import {ResponseData} from "../../shared/response-data/response-data";
import {QuestionType} from "./question-type";
import {QuestionBaseComponent} from "../base-question/question-base-component";
import { Type } from "@angular/core";

export class QuestionGroupBuilder {
    constructor(
        private questions: QuestionMetadata[],
        private readonly continueIf: (responseData: ResponseData) => boolean = () => true
    ) {}

    public andThenContinueIf(
        continueIf: (responseData: ResponseData) => boolean,
        nextQuestions: QuestionMetadata[]
    ): QuestionGroupBuilder {
        const combinedApplicableIf = q => continueIf(q) && this.continueIf(q);
        return new QuestionGroupBuilder([
            ...this.questions,
            ...nextQuestions.map(q => new OnlyApplicableIf(combinedApplicableIf, q))
        ], combinedApplicableIf);
    }

    public build(): QuestionMetadata[] {
        return this.questions;
    }
}

class OnlyApplicableIf implements QuestionMetadata {
    public readonly componentType: Type<QuestionBaseComponent>;
    public readonly questionId: string;
    public readonly questionType: QuestionType;

    constructor(
        private readonly applicableIf: (responseData: ResponseData) => boolean,
        private readonly wrappedQuestionMetadata: QuestionMetadata
    ) {
        this.componentType = wrappedQuestionMetadata.componentType;
        this.questionId = wrappedQuestionMetadata.questionId;
        this.questionType = wrappedQuestionMetadata.questionType;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return this.wrappedQuestionMetadata.hasBeenAnswered(responseData);
    }

    isApplicable(responseData: ResponseData): boolean {
        return this.applicableIf(responseData) && this.wrappedQuestionMetadata.isApplicable(responseData);
    }
}
