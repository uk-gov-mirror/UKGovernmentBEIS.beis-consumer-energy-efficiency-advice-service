import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import toString from "lodash-es/toString";

@Component({
    selector: 'app-length-of-heating-on-question',
    templateUrl: './detailed-length-of-heating-on-question.component.html',
    styleUrls: ['./detailed-length-of-heating-on-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class DetailedLengthOfHeatingOnQuestionComponent extends QuestionBaseComponent {

    get responseForAnalytics(): string {
        return JSON.stringify({
            earlyHours: this.earlyHours,
            morning: this.morning,
            afternoon: this.afternoon,
            evening: this.evening
        })
    }

    get earlyHours(): number {
        return this.responseData.detailedLengthOfHeatingOnEarlyHours;
    }

    set earlyHours(val: number) {
        this.responseData.detailedLengthOfHeatingOnEarlyHours = val;
    }

    get morning(): number {
        return this.responseData.detailedLengthOfHeatingOnMorning;
    }

    set morning(val: number) {
        this.responseData.detailedLengthOfHeatingOnMorning = val;
    }

    get afternoon(): number {
        return this.responseData.detailedLengthOfHeatingOnAfternoon;
    }

    set afternoon(val: number) {
        this.responseData.detailedLengthOfHeatingOnAfternoon = val;
    }

    get evening(): number {
        return this.responseData.detailedLengthOfHeatingOnEvening;
    }

    set evening(val: number) {
        this.responseData.detailedLengthOfHeatingOnEvening = val;
    }

    ngOnInit() {
        this.earlyHours = this.responseData.detailedLengthOfHeatingOnEarlyHours || 0;
        this.morning = this.responseData.detailedLengthOfHeatingOnMorning || 0;
        this.afternoon = this.responseData.detailedLengthOfHeatingOnAfternoon || 0;
        this.evening = this.responseData.detailedLengthOfHeatingOnEvening || 0;
    }

    handleFormSubmit() {
        if (this.responseData.detailedLengthOfHeatingOnEarlyHours !== undefined &&
            this.responseData.detailedLengthOfHeatingOnMorning !== undefined &&
            this.responseData.detailedLengthOfHeatingOnAfternoon !== undefined &&
            this.responseData.detailedLengthOfHeatingOnEvening !== undefined) {
            this.complete.emit();
        }
    }
}
