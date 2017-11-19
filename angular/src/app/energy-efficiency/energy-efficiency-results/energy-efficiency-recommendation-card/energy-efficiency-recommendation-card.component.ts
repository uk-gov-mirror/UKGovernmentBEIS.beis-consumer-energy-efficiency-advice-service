import {Component} from "@angular/core";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent {

    isExpandedView: boolean = false;

    toggleExpandedView(): void {
        console.log('toggle expanded view');
        this.isExpandedView = !this.isExpandedView;
    }
}