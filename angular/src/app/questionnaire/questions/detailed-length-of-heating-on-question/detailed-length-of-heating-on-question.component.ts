import {Component, OnInit} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import toString from 'lodash-es/toString';

@Component({
    selector: 'app-length-of-heating-on-question',
    templateUrl: './detailed-length-of-heating-on-question.component.html',
    styleUrls: ['./detailed-length-of-heating-on-question.component.scss'],
    animations: [slideInOutAnimation],
})

export class DetailedLengthOfHeatingOnQuestionComponent extends QuestionBaseComponent implements OnInit {

    readonly heatingPatterns = [
        {name: 'All day and all night', value: 1},
        {name: 'All day but off at night', value: 2},
        {name: 'Morning and evening', value: 3},
        {name: 'Just once a day', value: 4},
        {name: "I don't know", value: 5},
        {name: 'None of the above', value: 6},
    ];

    readonly morningTimes = [
        {name: 'Midnight', value: 0},
        {name: '1am', value: 1},
        {name: '2am', value: 2},
        {name: '3am', value: 3},
        {name: '4am', value: 4},
        {name: '5am', value: 5},
        {name: '6am', value: 6},
        {name: '7am', value: 7},
        {name: '8am', value: 8},
        {name: '9am', value: 9},
        {name: '10am', value: 10},
        {name: '11am', value: 11},
    ];

    readonly eveningTimes = [
        {name: 'Noon', value: 12},
        {name: '1pm', value: 13},
        {name: '2pm', value: 14},
        {name: '3pm', value: 15},
        {name: '4pm', value: 16},
        {name: '5pm', value: 17},
        {name: '6pm', value: 18},
        {name: '7pm', value: 19},
        {name: '8pm', value: 20},
        {name: '9pm', value: 21},
        {name: '10pm', value: 22},
        {name: '11pm', value: 23},
    ];

    get responseForAnalytics(): string {
        return JSON.stringify({
            heatingPatternType: this.heatingPatternType,
            morningHeatingStartTime: this.morningHeatingStartTime,
            morningHeatingDuration: this.morningHeatingDuration,
            eveningHeatingStartTime: this.eveningHeatingStartTime,
            eveningHeatingDuration: this.eveningHeatingDuration,
            heatingHoursPerDay: this.heatingHoursPerDay,
        });
    }

    get heatingPatternType(): number {
        return this.responseData.heatingPatternType;
    }

    set heatingPatternType(val: number) {
        this.responseData.heatingPatternType = val;
    }

    get morningHeatingStartTime(): number {
        return this.responseData.morningHeatingStartTime;
    }

    set morningHeatingStartTime(val: number) {
        this.responseData.morningHeatingStartTime = val;
    }

    get morningHeatingDuration(): number {
        return this.responseData.morningHeatingDuration;
    }

    set morningHeatingDuration(val: number) {
        this.responseData.morningHeatingDuration = val;
    }

    get eveningHeatingStartTime(): number {
        return this.responseData.eveningHeatingStartTime;
    }

    set eveningHeatingStartTime(val: number) {
        this.responseData.eveningHeatingStartTime = val;
    }

    get eveningHeatingDuration(): number {
        return this.responseData.eveningHeatingDuration;
    }

    set eveningHeatingDuration(val: number) {
        this.responseData.eveningHeatingDuration = val;
    }

    get heatingHoursPerDay(): number {
        return this.responseData.heatingPatternType;
    }

    set heatingHoursPerDay(val: number) {
        this.responseData.heatingHoursPerDay = val;
    }

    ngOnInit() {
        this.heatingPatternType = this.responseData.heatingPatternType || 0;
        this.morningHeatingStartTime = this.responseData.morningHeatingStartTime || 7;
        this.morningHeatingDuration = this.responseData.morningHeatingDuration || 2;
        this.eveningHeatingStartTime = this.responseData.eveningHeatingStartTime || 16;
        this.eveningHeatingDuration = this.responseData.eveningHeatingDuration || 7;
        this.heatingHoursPerDay = this.responseData.heatingHoursPerDay || 0;
    }

    handleFormSubmit() {
        if ( ([1, 2, 5, 6].includes(this.responseData.heatingPatternType)) ||
        (
            this.responseData.heatingPatternType === 3 &&
            this.responseData.morningHeatingStartTime !== undefined &&
            this.responseData.morningHeatingDuration !== undefined &&
            this.responseData.eveningHeatingStartTime !== undefined &&
            this.responseData.eveningHeatingDuration !== undefined
        ) ||
        (
            this.responseData.heatingPatternType === 4 &&
            this.responseData.heatingHoursPerDay !== undefined
        )) {
            this.complete.emit();
        }
    }
}
