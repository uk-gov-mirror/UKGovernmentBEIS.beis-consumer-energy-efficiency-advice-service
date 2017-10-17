import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {Component, OnInit} from "@angular/core";
import {range} from "lodash";

@Component({
    selector: 'app-bedrooms-question',
    templateUrl: './bedrooms-question.component.html',
    styleUrls: ['./bedrooms-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class BedroomsQuestionComponent extends QuestionBaseComponent<number> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        this.response = this.response || 1;
    }
}