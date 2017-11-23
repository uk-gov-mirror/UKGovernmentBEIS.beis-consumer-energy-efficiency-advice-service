import {Injectable, Inject} from "@angular/core";
import {NationalGrantCalculator} from "../national-grant-calculator";

@Injectable()
export class NationalGrantCalculatorFactory {

    constructor(@Inject(NationalGrantCalculator) public readonly nationalGrants: NationalGrantCalculator[]) {
    }
}