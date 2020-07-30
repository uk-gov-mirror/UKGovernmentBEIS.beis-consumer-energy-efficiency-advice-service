import {QuestionMetadata} from "../../base-question/question-metadata";
import {ResponseData} from "../../../shared/response-data/response-data";
import {QuestionBaseComponent} from "../../base-question/question-base-component";
import {QuestionType} from "../question-type";
import {Type} from "@angular/core";
import {HomeAge} from "../home-age-question/home-age";
import {Country} from "../postcode-epc-question/country";

export class OnlyApplicableIf implements QuestionMetadata {
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

export function englandOnly(questionMetadata: QuestionMetadata): QuestionMetadata {
    return new OnlyApplicableIf(responseData => responseData.country === Country.England, questionMetadata);
}

export function nonNewBuildOnly(questionMetadata: QuestionMetadata): QuestionMetadata {
    return new OnlyApplicableIf(
        responseData => (!responseData.newBuild || responseData.homeAge !== HomeAge.from2011toPresent),
        questionMetadata
    );
}
