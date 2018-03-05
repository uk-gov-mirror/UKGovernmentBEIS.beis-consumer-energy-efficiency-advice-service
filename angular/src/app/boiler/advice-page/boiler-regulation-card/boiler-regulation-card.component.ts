import {Component, Input} from '@angular/core';

export interface BoilerRegulation {
    headline: string;
    summary: string;
    efficiencyImprovement: number;
}

@Component({
    selector: 'app-boiler-regulation-card',
    templateUrl: './boiler-regulation-card.component.html',
    styleUrls: ['./boiler-regulation-card.component.scss']
})
export class BoilerRegulationCardComponent {
    @Input() regulation: BoilerRegulation;
}
