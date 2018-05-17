import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {
    getAgriculturalTenancyTypeDescription,
    AgriculturalTenancyType,
    getAgriculturalTenancyTypeTitle
} from './agricultural-tenancy-type';

class AgriculturalTenancyTypeOption {
    public readonly title: string;
    public readonly description: string;

    constructor(public readonly value: AgriculturalTenancyType, public readonly className: string) {
        this.title = getAgriculturalTenancyTypeTitle(value);
        this.description = getAgriculturalTenancyTypeDescription(value);
    }
}

@Component({
    selector: 'app-agricultural-tenancy-type-question',
    templateUrl: './agricultural-tenancy-type-question.component.html',
    styleUrls: ['./agricultural-tenancy-type-question.component.scss'],
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
