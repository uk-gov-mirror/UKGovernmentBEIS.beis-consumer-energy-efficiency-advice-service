import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';
import {GardenAccessibility} from './garden-accessibility';

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
export class GardenQuestionComponent extends QuestionBaseComponent implements OnInit {

    readonly accessibilityOptions: AccessibilityOption[] = [
        {name: 'No garden', value: GardenAccessibility.NoGarden},
        {name: 'Not accessible', value: GardenAccessibility.NotAccessible},
        {name: 'Accessible', value: GardenAccessibility.Accessible},
    ];
    readonly ACCESSIBLE = GardenAccessibility.Accessible;

    readonly SLIDER_CONFIG = {
        range: {
            min: 100,
            max: 1600,
        },
        start: [100],
        step: 100,
        tooltips: [true],
        format: {
            to: value => (+value).toFixed(0) + 'm²',
            from: value => +value.slice(0, -2),
        }
    };

    ngOnInit() {
        this.size = this.responseData.gardenSizeSquareMetres || 100;
    }

    get responseForAnalytics(): string {
        return JSON.stringify({
            accessibility: GardenAccessibility[this.accessibility],
            size: this.size.toString(10),
        });
    }

    handleOptionClicked(val: GardenAccessibility) {
        this.accessibility = val;
    }

    getTennisCourts() {
        if (this.size % 200 === 100) {
            return (this.size / 200).toFixed(1);
        } else {
            return (this.size / 200).toFixed(0);
        }
    }

    get accessibility(): GardenAccessibility {
        return this.responseData.gardenAccessibility;
    }

    set accessibility(val: GardenAccessibility) {
        this.responseData.gardenAccessibility = val;
        if (val === GardenAccessibility.Accessible) {
            this.responseData.hasOutsideSpace = true;
        }
    }

    get size(): number {
        return this.responseData.gardenSizeSquareMetres;
    }

    set size(val: number) {
        this.responseData.gardenSizeSquareMetres = val;
    }
}
