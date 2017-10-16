import {Component} from '@angular/core';
import {FuelType} from './fuel-type';
import {QuestionBaseComponent, slideInOutAnimation} from '../question.component';

interface FuelTypeOption {
    name: string,
    value: FuelType,
    className: string
}

@Component({
    selector: 'app-fuel-type-question',
    templateUrl: './fuel-type-question.component.html',
    styleUrls: ['./fuel-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class FuelTypeQuestionComponent extends QuestionBaseComponent<FuelType> {
    fuelTypeOptions: FuelTypeOption[];

    constructor() {
        super();
        this.fuelTypeOptions = [
            {name: 'Electricity', value: FuelType.Electricity, className: 'electricity'},
            {name: 'Mains Gas', value: FuelType.MainsGas, className: 'mains-gas'},
            {name: 'LPG Gas', value: FuelType.LPGGas, className: 'lpg-gas'},
            {name: 'Heating Oil', value: FuelType.HeatingOil, className: 'heating-oil'},
            {name: 'Solid Fuel', value: FuelType.SolidFuel, className: 'solid-fuel'},
        ]
    }
}