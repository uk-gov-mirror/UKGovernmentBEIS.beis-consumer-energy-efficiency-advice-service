import {findIndex, findLastIndex} from 'lodash';
import {QuestionMetadata} from '../base-question/question-metadata';
import {ResponseData} from '../../common/response-data/response-data';

export abstract class Questionnaire {
    constructor(public readonly id: string,
                private responseData: ResponseData,
                private readonly questionsMetadata: QuestionMetadata<any>[]) {
    }

    public getQuestion(index: number) {
        return this.questionsMetadata[index];
    }

    public isApplicable(index: number) {
        return this.questionsMetadata[index].isApplicable(this.responseData);
    }

    public isAvailable(index: number) {
        return this.questionsMetadata[index] !== undefined &&
            this.questionsMetadata[index].isApplicable(this.responseData) &&
            this.questionsMetadata.slice(0, index)
                .every(q => q.hasBeenAnswered(this.responseData) || !q.isApplicable(this.responseData));
    }

    public hasBeenAnswered(index: number) {
        return this.questionsMetadata[index] !== undefined && this.questionsMetadata[index].hasBeenAnswered(this.responseData);
    }

    public getPreviousQuestionIndex(index: number) {
        return index === 0
            ? -1
            : findLastIndex(this.questionsMetadata, q => q.isApplicable(this.responseData), index - 1);
    }

    public getNextQuestionIndex(index: number) {
        return findIndex(this.questionsMetadata, q => q.isApplicable(this.responseData), index + 1);
    }

    public getQuestions(): QuestionMetadata<any>[] {
        return this.questionsMetadata;
    }
}