import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {getAgriculturalTenancyTypeDescription, AgriculturalTenancyType} from './agricultural-tenancy-type';

class AgriculturalTenancyTypeOption {
    public readonly name: string;

    constructor(public readonly value: AgriculturalTenancyType, public readonly className: string) {
        this.name = getAgriculturalTenancyTypeDescription(value);
    }
}

@Component({
    selector: 'app-agricultural-tenancy-type-question',
    templateUrl: './agricultural-tenancy-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class AgriculturalTenancyTypeQuestionComponent extends QuestionBaseComponent {
    tenancyTypeOptions = [
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.AssuredTenancy, 'assured-tenancy'),
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.ProtectedOccupancy, 'protected-occupancy'),
        new AgriculturalTenancyTypeOption(AgriculturalTenancyType.StatutoryTenancy, 'statutory-tenancy'),
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