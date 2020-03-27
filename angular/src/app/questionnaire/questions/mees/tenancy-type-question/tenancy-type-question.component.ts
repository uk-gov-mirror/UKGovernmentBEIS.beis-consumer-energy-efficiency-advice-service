import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {getTenancyTypeDescription, TenancyType} from './tenancy-type';
import {MultipleChoiceOption} from "../../../common-questions/multiple-choice-question/multiple-choice-option";

class TenancyTypeOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: TenancyType, public readonly className: string) {
        this.name = getTenancyTypeDescription(value);
    }
}

@Component({
    selector: 'app-tenancy-type-question',
    templateUrl: './tenancy-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class TenancyTypeQuestionComponent extends QuestionBaseComponent {
    tenancyTypeOptions = [
        new TenancyTypeOption(TenancyType.AssuredTenancy, 'assured-tenancy'),
        new TenancyTypeOption(TenancyType.RegulatedTenancy, 'regulated-tenancy'),
        new TenancyTypeOption(TenancyType.DomesticAgriculturalTenancy, 'agricultural-tenancy'),
        new TenancyTypeOption(TenancyType.Other, 'other-tenancy'),
    ];

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
