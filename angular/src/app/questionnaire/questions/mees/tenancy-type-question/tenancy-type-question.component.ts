import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {getTenancyTypeDescription, TenancyType} from './tenancy-type';

class TenancyTypeOption {
    public readonly name: string;

    constructor(public readonly value: TenancyType, public readonly className: string) {
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
            new TenancyTypeOption(TenancyType.AssuredTenancy, 'assured-tenancy'),
            new TenancyTypeOption(TenancyType.RegulatedTenancy, 'regulated-tenancy'),
            new TenancyTypeOption(TenancyType.DomesticAgriculturalTenancy, 'agricultural-tenancy'),
            new TenancyTypeOption(TenancyType.Other, 'other-tenancy'),
        ];
    }

    get responseForAnalytics(): string {
        return TenancyType[this.response];
    }

    get response(): TenancyType {
        return this.responseData.tenancyType;
    }

    set response(val: TenancyType) {
        this.responseData.tenancyType = val;
    }
}
