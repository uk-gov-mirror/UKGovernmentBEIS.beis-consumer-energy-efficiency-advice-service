import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';

@Component({
    selector: 'app-hot-water-cylinder-question',
    templateUrl: '../../common-questions/boolean-question/boolean-question.component.html',
    styleUrls: ['../../common-questions/boolean-question/boolean-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class HotWaterCylinderQuestionComponent extends QuestionBaseComponent {
    get images(): { img: string; name: string; id: number; label: string }[] {
        return this._images;
    }

    set images(value: { img: string; name: string; id: number; label: string }[]) {
        this._images = value;
    }
    private _images = [
        {id: 1, label: "hotwatercyclinder", img: "hotwatercylinder.jpg", name: "Hot Water Cylinder"}
    ];

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