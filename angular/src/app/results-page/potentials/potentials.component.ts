import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-potentials',
    templateUrl: './potentials.component.html',
    styleUrls: ['./potentials.component.scss']
})
export class PotentialsComponent {
    @Input() currentBill: number;
    @Input() potentialSavings: number;
    @Input() currentEpc: string;
    @Input() potentialEpc: string;
}
