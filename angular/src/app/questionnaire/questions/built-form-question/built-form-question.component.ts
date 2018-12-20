import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {BuiltFormAnswer, getBuiltFormDescription} from "./built-form-answer";

class BuiltFormOption {
    public readonly name: string;

    constructor(public readonly value: BuiltFormAnswer, public readonly className: string) {
        this.name = getBuiltFormDescription(value);
    }
}

@Component({
    selector: 'app-built-form-question',
    templateUrl: './built-form-question.component.html',
    styleUrls: ['./built-form-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class BuiltFormQuestionComponent extends QuestionBaseComponent {
    builtFormOptions: BuiltFormOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.builtFormOptions = [
            new BuiltFormOption(BuiltFormAnswer.Detached, 'detached'),
            new BuiltFormOption(BuiltFormAnswer.SemiDetached, 'semi-detached'),
            new BuiltFormOption(BuiltFormAnswer.EndTerrace, 'end-terrace'),
            new BuiltFormOption(BuiltFormAnswer.MidTerrace, 'mid-terrace'),
            new BuiltFormOption(BuiltFormAnswer.EnclosedEndTerrace, 'enclosed-end-terrace'),
            new BuiltFormOption(BuiltFormAnswer.EnclosedMidTerrace, 'enclosed-mid-terrace')
        ];
    }

    get responseForAnalytics(): string {
        return BuiltFormAnswer[this.response];
    }

    get response(): BuiltFormAnswer {
        return this.responseData.builtForm;
    }

    set response(val: BuiltFormAnswer) {
        this.responseData.builtForm = val;
    }
}
