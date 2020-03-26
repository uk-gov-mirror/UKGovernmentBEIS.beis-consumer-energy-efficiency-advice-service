import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-hot-water-cylinder-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    animations: [slideInOutAnimation],
})
export class HotWaterCylinderQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.response ? 'Hot Water Cylinder' : 'No Hot Water Cylinder';
    }

    get response(): boolean {
        return this.responseData.hotWaterCylinder;
    }

    set response(val: boolean) {
        this.responseData.hotWaterCylinder = val;
    }
}
