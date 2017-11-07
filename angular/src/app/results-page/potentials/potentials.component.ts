import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-potentials',
    templateUrl: './potentials.component.html',
    styleUrls: ['./potentials.component.scss']
})
export class PotentialsComponent {
    @Input() totalInvestment: number;
    @Input() totalSavings: number;
}
