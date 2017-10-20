import {Injectable} from '@angular/core';
import {findIndex, findLastIndex} from 'lodash';
import {QuestionMetadata} from '../base-question/question-metadata';
import {HomeTypeQuestionMetadata} from './home-type-question/home-type-question-metadata';
import {ResponseData} from '../../response-data/response-data';
import {StoreysQuestionMetadata} from './storeys-question/storeys-question-metadata';
import {FuelTypeQuestionMetadata} from './fuel-type-question/fuel-type-question-metadata';
import {PostcodeEpcQuestionMetadata} from './postcode-epc-question/postcode-epc-question-metadata';
import {FlatPositionQuestionMetadata} from './flat-position-question/flat-position-question-metadata';
import {BedroomsQuestionMetadata} from './bedrooms-question/bedrooms-question-metadata';
import {BoilerTypeQuestionMetadata} from './boiler-type-question/boiler-type-question-metadata';
import {ElectricityTariffQuestionMetadata} from './electricity-tariff-question/electricity-tariff-question-metadata';
import {HomeAgeQuestionMetadata} from './home-age-question/home-age-question-metadata';
import {ConfirmEpcQuestionMetadata} from "./confirm-epc-question/confirm-epc-question-metadata";

@Injectable()
export class QuestionnaireService {

    private readonly questionMetadata: QuestionMetadata<any>[];

    constructor(public responseData: ResponseData) {
        this.questionMetadata = [
            new PostcodeEpcQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata()
        ];
    }

    public getQuestion(index: number) {
        return this.questionMetadata[index];
    }

    public isAvailable(index: number) {
        return this.questionMetadata[index] !== undefined &&
               this.questionMetadata[index].isApplicable(this.responseData) &&
               this.questionMetadata.slice(0, index)
                   .filter(q => q.isApplicable(this.responseData))
                   .every(q => q.hasBeenAnswered(this.responseData));
    }

    public hasBeenAnswered(index: number) {
        return this.questionMetadata[index] !== undefined && this.questionMetadata[index].hasBeenAnswered(this.responseData);
    }

    public getPreviousQuestionIndex(index: number) {
        return index === 0
            ? -1
            : findLastIndex(this.questionMetadata, q => q.isApplicable(this.responseData), index - 1);
    }

    public getNextQuestionIndex(index: number) {
        return findIndex(this.questionMetadata, q => q.isApplicable(this.responseData), index + 1);
    }

    public getQuestions(): QuestionMetadata<any>[] {
        return this.questionMetadata;
    }
}