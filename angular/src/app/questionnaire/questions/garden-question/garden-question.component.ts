import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component} from "@angular/core";
import {GardenAccessibility} from "./garden-accessibility";

interface AccessibilityOption {
    name: string;
    value: GardenAccessibility;
}

@Component({
    selector: 'app-garden-question',
    templateUrl: './garden-question.component.html',
    styleUrls: ['./garden-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class GardenQuestionComponent extends QuestionBaseComponent {

    readonly accessibilityOptions: AccessibilityOption[] = [
        {name: 'No garden', value: GardenAccessibility.NoGarden},
        {name: 'Not accessible', value: GardenAccessibility.NotAccessible},
        {name: 'Accessible', value: GardenAccessibility.Accessible},
    ];

    updateAccessibilityAndMaybeComplete(val: GardenAccessibility) {
        this.accessibility = val;
        if (val !== GardenAccessibility.Accessible) {
            this.complete.emit();
        }
    }

    get accessibility(): GardenAccessibility {
        return this.responseData.gardenAccessibility;
    }

    set accessibility(val: GardenAccessibility) {
        this.responseData.gardenAccessibility = val;
    }

    get size(): number {
        return this.responseData.gardenSizeCubicMetres;
    }

    set size(val: number) {
        this.responseData.gardenSizeCubicMetres = val;
    }
}