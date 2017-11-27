import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-break-even',
    templateUrl: './break-even.component.html',
    styleUrls: ['./break-even.component.scss']
})
export class BreakEvenComponent {

    @Input() investmentPounds: number;
    @Input() lifespanYears: number;
    @Input() costSavingPoundsPerYear: number;

    breakEvenYears: number;
    investmentAsProportionOfLifespanSavings: number;
    breakEvenTimeAsProportionOfLifespan: number;
    shouldDisplayBreakEven: boolean;

    ngOnInit() {
        this.breakEvenYears = this.investmentPounds/this.costSavingPoundsPerYear;
        this.shouldDisplayBreakEven = this.breakEvenYears < this.lifespanYears;
        const totalLifespanCostSavingPounds = this.lifespanYears * this.costSavingPoundsPerYear;
        this.investmentAsProportionOfLifespanSavings = this.investmentPounds/totalLifespanCostSavingPounds;
        this.breakEvenTimeAsProportionOfLifespan = this.breakEvenYears/this.lifespanYears;
    }

    round(input: number): number {
        if (input < 1) {
            return Math.round(input * 10)/10;
        }
        return Math.round(input);
    }
}