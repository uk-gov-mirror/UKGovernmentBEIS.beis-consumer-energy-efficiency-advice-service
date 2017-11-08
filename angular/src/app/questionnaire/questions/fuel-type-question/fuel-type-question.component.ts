import {Component} from "@angular/core";
import {FuelType, getFuelTypeDescription} from "./fuel-type";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";

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
export class FuelTypeQuestionComponent extends QuestionBaseComponent {
    fuelTypeOptions: FuelTypeOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.fuelTypeOptions = [
            new FuelTypeOption(FuelType.Electricity, 'electricity'),
            new FuelTypeOption(FuelType.MainsGas, 'mains-gas'),
            new FuelTypeOption(FuelType.LPGGas, 'lpg-gas'),
            new FuelTypeOption(FuelType.HeatingOil, 'heating-oil'),
            new FuelTypeOption(FuelType.SolidFuel, 'solid-fuel')
        ]
    }

    get response(): FuelType {
        return this.responseData.fuelType;
    }

    set response(val: FuelType) {
        this.responseData.fuelType = val;
    }
}