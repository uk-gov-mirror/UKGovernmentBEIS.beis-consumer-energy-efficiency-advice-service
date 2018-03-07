import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import toString from 'lodash-es/toString';

@Component({
    selector: 'app-living-room-temperature-question',
    templateUrl: './living-room-temperature-question.component.html',
    styleUrls: ['./living-room-temperature-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class LivingRoomTemperatureQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return toString(this.response);
    }

    ngOnInit() {
        this.response = this.response || 21;
    }

    get response(): number {
        return this.responseData.livingRoomTemperature;
    }

    set response(val: number) {
        this.responseData.livingRoomTemperature = val;
    }

    handleFormSubmit() {
        this.complete.emit();
    }
}
