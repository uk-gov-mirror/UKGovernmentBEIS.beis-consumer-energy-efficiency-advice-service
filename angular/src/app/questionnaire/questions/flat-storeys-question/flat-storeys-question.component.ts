import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";
import toString from "lodash-es/toString";
import {HomeType} from "../home-type-question/home-type";

@Component({
    selector: 'app-flat-storeys-question',
    templateUrl: './flat-storeys-question.component.html',
    styleUrls: ['./flat-storeys-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FlatStoreysQuestionComponent extends QuestionBaseComponent implements OnInit {
    private numberOfStoreysInBuilding: number;

    get responseForAnalytics(): string {
        return toString(this.numberOfStoreysInFlat);
    }

    ngOnInit() {
        this.numberOfStoreysInFlat = this.numberOfStoreysInFlat || 1;
        this.numberOfStoreysInBuilding = this.numberOfStoreysInBuilding || 1;
    }

    get numberOfStoreysInFlat(): number {
        return this.responseData.numberOfStoreys;
    }

    set numberOfStoreysInFlat(val: number) {
        this.responseData.numberOfStoreys = val;
    }

    handleFormSubmit() {
        if (this.numberOfStoreysInFlat) {
            this.complete.emit();
        }
    }
}
