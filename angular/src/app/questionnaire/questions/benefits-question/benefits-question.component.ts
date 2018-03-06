import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import {Benefits} from './benefits';

interface BenefitsOption {
    value: Benefits;
    name: string;
}

@Component({
    selector: 'app-benefits-question',
    templateUrl: './benefits-question.component.html',
    styleUrls: ['./benefits-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class BenefitsQuestionComponent extends QuestionBaseComponent implements OnInit {
    readonly options: BenefitsOption[] = [
        {value: Benefits.ESA, name: 'Employment and Support Allowance'},
        {value: Benefits.JobseekersAllowance, name: 'Income-based Jobseeker\'s Allowance'},
        {value: Benefits.IncomeSupport, name: 'Income Support'},
        {value: Benefits.PensionGuaranteeCredit, name: 'Pension Guarantee Credit'},
        {value: Benefits.TaxCredits, name: 'Tax Credit'},
        {value: Benefits.UniversalCredit, name: 'Universal Credit'}
    ];
    readonly Benefits = Benefits;

    get responseForAnalytics(): string {
        const benefits = this.options.filter(option => this.isBenefitSelected(option))
            .map(option => Benefits[option.value]);
        return benefits.length ? benefits.join(', ') : 'None';
    }

    ngOnInit() {
        this.response = this.response || Benefits.None;
    }

    get response(): Benefits {
        return this.responseData.benefits;
    }

    set response(val: Benefits) {
        this.responseData.benefits = val;
    }

    toggleBenefit(benefitsOptions: BenefitsOption) {
        this.response ^= benefitsOptions.value;
    }

    isBenefitSelected(benefitsOptions: BenefitsOption) {
        return this.response & benefitsOptions.value;
    }
}
