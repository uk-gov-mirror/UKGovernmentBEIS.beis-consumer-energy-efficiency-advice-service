import {Injectable} from '@angular/core';
import {findIndex, findLastIndex} from 'lodash';
import {QuestionMetadata} from '../base-question/question-metadata';
import {QuestionBaseComponent} from '../base-question/question-base-component';
import {HomeTypeQuestion} from './home-type-question/home-type-question';
import {ResponseData} from '../response-data/response-data';
import {StoreysQuestion} from './storeys-question/storeys-question';
import {FuelTypeQuestion} from './fuel-type-question/fuel-type-question';
import {PostcodeEpcQuestion} from './postcode-epc-question/postcode-epc-question';
import {FlatPositionQuestion} from './flat-position-question/flat-position-question';
import {BedroomsQuestion} from './bedrooms-question/bedrooms-question';
import {BoilerTypeQuestion} from './boiler-type-question/boiler-type-question';
import {ElectricityTariffQuestion} from './electricity-tariff-question/electricity-tariff-question';
import {HomeAgeQuestion} from './home-age-question/home-age-question';

@Injectable()
export class QuestionService {

    private readonly questions: QuestionMetadata<any, QuestionBaseComponent<any>>[];

    constructor(responseData: ResponseData) {
        this.questions = [
            new PostcodeEpcQuestion(responseData),
            new HomeTypeQuestion(responseData),
            new FlatPositionQuestion(responseData),
            new HomeAgeQuestion(responseData),
            new StoreysQuestion(responseData),
            new BedroomsQuestion(responseData),
            new FuelTypeQuestion(responseData),
            new BoilerTypeQuestion(responseData),
            new ElectricityTariffQuestion(responseData)
        ];
    }

    public getQuestion(index: number) {
        return this.questions[index];
    }

    public getPreviousQuestionIndex(index: number) {
        return index === 0
            ? -1
            : findLastIndex(this.questions, q => q.isApplicable(), index - 1);
    }

    public getNextQuestionIndex(index: number) {
        return findIndex(this.questions, q => q.isApplicable(), index + 1);
    }

    public getQuestions(): QuestionMetadata<any, QuestionBaseComponent<any>>[] {
        return this.questions;
    }
}