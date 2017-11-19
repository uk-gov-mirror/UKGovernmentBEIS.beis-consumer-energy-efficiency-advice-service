import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-fridge-freezer-question',
    templateUrl: './fridge-freezer-question.component.html',
    styleUrls: ['./fridge-freezer-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FridgeFreezerQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return JSON.stringify({fridgeFreezers: this.fridgeFreezers, fridges: this.fridges, freezers: this.freezers});
    }

    ngOnInit() {
        this.fridgeFreezers = this.fridgeFreezers || 0;
        this.fridges = this.fridges || 0;
        this.freezers = this.freezers || 0;
    }

    get fridgeFreezers(): number {
        return this.responseData.numberOfFridgeFreezers;
    }

    set fridgeFreezers(val: number) {
        this.responseData.numberOfFridgeFreezers = val;
    }

    get freezers(): number {
        return this.responseData.numberOfFreezers;
    }

    set freezers(val: number) {
        this.responseData.numberOfFreezers = val;
    }

    get fridges(): number {
        return this.responseData.numberOfFridges;
    }

    set fridges(val: number) {
        this.responseData.numberOfFridges = val;
    }

    handleFormSubmit() {
        this.complete.emit();
    }
}
