import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {TenureType} from './tenure-type';
import {ResponseData} from '../../../shared/response-data/response-data';

@Component({
    selector: 'app-ownership-status-question',
    templateUrl: './tenure-type-question.component.html',
    styleUrls: ['./tenure-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class TenureTypeQuestionComponent extends QuestionBaseComponent {
    tenureTypeOptions: TenureTypeOption[];

    get responseForAnalytics(): string {
        return TenureType[this.response];
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.tenureTypeOptions = [
            {
                value: TenureType.OwnerOccupancy,
                id: 'owner-occupancy',
                description: 'I own my own home'
            },
            {
                value: TenureType.PrivateTenancy,
                id: 'private-tenancy',
                description: 'I rent my home from a private landlord'
            },
            {
                value: TenureType.SocialTenancy,
                id: 'social-tenancy',
                description: 'I rent my home from the council or a housing association'
            },
        ];
    }

    get response(): TenureType {
        return this.responseData.tenureType;
    }

    set response(val: TenureType) {
        this.responseData.tenureType = val;
    }
}

interface TenureTypeOption {
    value: TenureType;
    description: string;
    id: string;
}
