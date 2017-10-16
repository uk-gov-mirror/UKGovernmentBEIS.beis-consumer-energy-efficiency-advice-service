import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'app-storeys-question',
    templateUrl: './storeys-question.component.html',
    styleUrls: ['./storeys-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class StoreysQuestionComponent extends QuestionBaseComponent<number> implements OnInit {
    storeys: number;
    isInvalid: boolean;

    constructor() {
        super();
    }

    ngOnInit() {
        this.storeys = this.response = this.response || 1;
    }

    increaseStoreys(amount: number): void {
        this.storeys += amount;
        this.updateStoreys();
    }

    updateStoreys() {
        if (this.storeys < 1) {
            this.isInvalid = true;
        } else {
            this.isInvalid = false;
            this.response = this.storeys;
        }
    }
}
