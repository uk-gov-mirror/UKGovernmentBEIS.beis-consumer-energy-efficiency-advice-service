import {Injectable, Inject} from "@angular/core";
import {NationalGrantCalculator} from "../national-grant-calculator";

@Injectable()
export class NationalGrantCalculatorProvider {

    constructor(@Inject(NationalGrantCalculator) public readonly nationalGrants: NationalGrantCalculator[]) {
    }
}
