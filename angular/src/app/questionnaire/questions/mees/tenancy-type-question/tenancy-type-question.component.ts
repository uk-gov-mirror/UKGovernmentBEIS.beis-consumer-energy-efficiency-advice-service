import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {getTenancyTypeDescription, TenancyType} from './tenancy-type';

class TenancyTypeOption {
    public readonly name: string;

    constructor(public readonly value: TenancyType) {
        this.name = getTenancyTypeDescription(value);
    }
}

@Component({
    selector: 'app-tenancy-type-question',
    templateUrl: './tenancy-type-question.component.html',
    styleUrls: ['./tenancy-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TenancyTypeQuestionComponent extends QuestionBaseComponent {
    tenancyTypeOptions: TenancyTypeOption[] = [];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.tenancyTypeOptions = [
            new TenancyTypeOption(TenancyType.AssuredTenancy),
            new TenancyTypeOption(TenancyType.RegulatedTenancy),
            new TenancyTypeOption(TenancyType.AgriculturalTenancy),
            new TenancyTypeOption(TenancyType.Other),
        ];
    }

    get responseForAnalytics(): string {
        return 'test'; // TODO
        // return HouseExposedWall[this.response];
    }

    get response(): TenancyType {
        return this.responseData.tenancyType;
    }

    set response(val: TenancyType) {
        this.responseData.tenancyType = val;
    }
}
