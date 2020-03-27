import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultipleChoiceOption} from "./multiple-choice-option";

@Component({
    selector: 'app-multiple-choice-question',
    templateUrl: './multiple-choice-question.component.html'
})
export class MultipleChoiceQuestionComponent {
    @Input() name: string;
    @Input() options: MultipleChoiceOption[];

    @Input() twoColumnsOnDesktop: boolean = false;
    @Input() capitalizeOptions: boolean = false;

    get response(): any {
        return this._response;
    }

    @Input()
    set response(value: any) {
        if (value !== undefined) {
            this._response = value;
        }
    }

    @Output() responseChange = new EventEmitter<any>();

    private _response: any;
}
