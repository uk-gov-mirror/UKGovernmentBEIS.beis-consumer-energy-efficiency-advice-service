import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {
    getAgriculturalTenancyTypeDescription,
    AgriculturalTenancyType,
    getAgriculturalTenancyTypeTitle
} from './agricultural-tenancy-type';
import {MultipleChoiceOption} from "../../../common-questions/multiple-choice-question/multiple-choice-option";

class AgriculturalTenancyTypeOption implements MultipleChoiceOption {
    public readonly name: string;
    public readonly description: string;

    constructor(public readonly value: AgriculturalTenancyType, public readonly className: string) {
        this.name = getAgriculturalTenancyTypeTitle(value);
        this.description = getAgriculturalTenancyTypeDescription(value);
    }
}

@Component({
    selector: 'app-agricultural-tenancy-type-question',
    templateUrl: './agricultural-tenancy-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class AgriculturalTenancyTypeQuestionComponent extends QuestionBaseComponent {
    options = [
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.AssuredTenancy, 'assured-tenancy'),
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.ProtectedOccupancy, 'protected-occupancy'),
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.StatutoryTenancy, 'statutory-tenancy'),
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.Other, 'other'),
    ];

    get responseForAnalytics(): string {
        return AgriculturalTenancyType[this.response];
    }

    get response(): AgriculturalTenancyType {
        return this.responseData.agriculturalTenancyType;
    }

    set response(val: AgriculturalTenancyType) {
        this.responseData.agriculturalTenancyType = val;
    }
}
