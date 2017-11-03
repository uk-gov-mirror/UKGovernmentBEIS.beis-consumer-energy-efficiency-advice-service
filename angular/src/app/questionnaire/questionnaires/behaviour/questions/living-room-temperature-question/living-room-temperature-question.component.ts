import {QuestionBaseComponent, slideInOutAnimation} from "../../../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-living-room-temperature-question',
    templateUrl: './living-room-temperature-question.component.html',
    styleUrls: ['./living-room-temperature-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class LivingRoomTemperatureQuestionComponent extends QuestionBaseComponent implements OnInit {

    ngOnInit() {
        this.response = this.response || 20;
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