import findIndex from 'lodash-es/findIndex';
import findLastIndex from 'lodash-es/findLastIndex';
import {QuestionMetadata} from '../base-question/question-metadata';
import {ResponseData} from '../../shared/response-data/response-data';

export abstract class Questionnaire {

    constructor(private responseData: ResponseData,
                private readonly questionsMetadata: QuestionMetadata[]) {
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

    public isComplete() {
        return this.questionsMetadata.every(q => q.hasBeenAnswered(this.responseData) || !q.isApplicable(this.responseData));
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

    public getQuestions(): QuestionMetadata[] {
        return this.questionsMetadata;
    }
}
