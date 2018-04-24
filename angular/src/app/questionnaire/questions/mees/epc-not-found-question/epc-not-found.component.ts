import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../../base-question/question-base-component';

@Component({
    selector: 'app-epc-not-found',
    templateUrl: './epc-not-found.component.html',
    animations: [slideInOutAnimation]
})
export class EpcNotFoundComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return 'EPC not found';
    }

    get response(): boolean {
        return this.responseData.confirmEpcNotFound;
    }

    set response(val: boolean) {
        this.responseData.confirmEpcNotFound = val;
    }
}
