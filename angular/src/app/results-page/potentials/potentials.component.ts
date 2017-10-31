import {Component, Input} from "@angular/core";
import {EnergyCalculations} from "./energy-calculations";

@Component({
    selector: 'app-potentials',
    templateUrl: './potentials.component.html',
    styleUrls: ['./potentials.component.scss']
})
export class PotentialsComponent {
    @Input() energyCalculations: EnergyCalculations;
}
