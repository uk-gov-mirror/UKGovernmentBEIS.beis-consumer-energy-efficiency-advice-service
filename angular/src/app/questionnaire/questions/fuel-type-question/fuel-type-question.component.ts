import {Component} from '@angular/core';
import {FuelType, getFuelTypeDescription} from './fuel-type';
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
            {name: getFuelTypeDescription(FuelType.Electricity), value: FuelType.Electricity, className: 'electricity'},
            {name: getFuelTypeDescription(FuelType.MainsGas), value: FuelType.MainsGas, className: 'mains-gas'},
            {name: getFuelTypeDescription(FuelType.LPGGas), value: FuelType.LPGGas, className: 'lpg-gas'},
            {name: getFuelTypeDescription(FuelType.HeatingOil), value: FuelType.HeatingOil, className: 'heating-oil'},
            {name: getFuelTypeDescription(FuelType.SolidFuel), value: FuelType.SolidFuel, className: 'solid-fuel'},
        ]
    }
}