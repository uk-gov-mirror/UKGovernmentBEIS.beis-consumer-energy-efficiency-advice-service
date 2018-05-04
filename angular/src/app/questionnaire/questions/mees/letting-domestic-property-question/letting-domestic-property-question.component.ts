import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';
import {getLettingDomesticPropertyStageDescription, LettingDomesticPropertyStage} from './letting-domestic-property-stage';

class LettingOption {
    public readonly name: string;

    constructor(public readonly value: LettingDomesticPropertyStage, public readonly className: string) {
        this.name = getLettingDomesticPropertyStageDescription(value);
    }
}

@Component({
    selector: 'app-letting-domestic-property-question',
    templateUrl: './letting-domestic-property-question.component.html',
    animations: [slideInOutAnimation]
})
export class LettingDomesticPropertyQuestionComponent extends QuestionBaseComponent {
    lettingOptions = [
        new LettingOption(LettingDomesticPropertyStage.BeforeApril2018, 'before-2018'),
        new LettingOption(LettingDomesticPropertyStage.AfterApril2018, 'after-2018'),
        new LettingOption(LettingDomesticPropertyStage.InProcess, 'in-process'),
    ];

    get responseForAnalytics(): string {
        return LettingDomesticPropertyStage[this.response];
    }

    get response(): LettingDomesticPropertyStage {
        return this.responseData.lettingDomesticPropertyStage;
    }

    set response(val: LettingDomesticPropertyStage) {
        this.responseData.lettingDomesticPropertyStage = val;
    }
}
