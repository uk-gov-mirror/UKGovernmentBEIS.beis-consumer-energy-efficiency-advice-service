import {Component} from '@angular/core';
import {FuelType, getFuelTypeDescription} from './fuel-type';
import {QuestionBaseComponent, slideInOutAnimation} from '../question.component';

class FuelTypeOption {
    public readonly name: string;

    constructor(public readonly value: FuelType, public readonly className: string) {
        this.name = getFuelTypeDescription(value);
    }
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
            new FuelTypeOption(FuelType.Electricity, 'electricity'),
            new FuelTypeOption(FuelType.MainsGas, 'mains-gas'),
            new FuelTypeOption(FuelType.LPGGas, 'lpg-gas'),
            new FuelTypeOption(FuelType.HeatingOil, 'heating-oil'),
            new FuelTypeOption(FuelType.SolidFuel, 'solid-fuel')
        ]
    }
}