import {Component, DoCheck, HostListener, OnInit, ViewChild} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "../../../shared/recommendations-service/energy-efficiency-recommendation";
import {ResponseData} from "../../../shared/response-data/response-data";
import {RecommendationsService} from "../../../shared/recommendations-service/recommendations.service";

@Component({
    selector: 'app-your-plan-footer',
    templateUrl: './your-plan-footer.component.html',
    styleUrls: ['./your-plan-footer.component.scss']
})
export class YourPlanFooterComponent implements OnInit, DoCheck {

    @ViewChild('yourPlanRow') yourPlanRow;

    isFixedPosition: boolean = true;
    yourPlanRowHeightPixels: number;

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    constructor(private recommendationsService: RecommendationsService) {
    }

    ngOnInit() {
        this.updateYourPlanRowPosition();
        this.yourPlanRowHeightPixels = this.yourPlanRow.nativeElement.clientHeight;
    }

    ngDoCheck() {
        this.yourPlanRowHeightPixels = this.yourPlanRow.nativeElement.clientHeight;
    }

    removeFromPlan(recommendation: EnergyEfficiencyRecommendation) {
        this.recommendationsService.toggleAddedToPlan(recommendation);
    }

    @HostListener("window:scroll", [])
    updateYourPlanRowPosition() {
        const footer = document.querySelector('#page-footer');
        if (footer) {
            const footerTopPosition = footer.getBoundingClientRect().top;
            const footerVisibleHeight = window.innerHeight - footerTopPosition;
            this.isFixedPosition = footerVisibleHeight < 0;
        }
    }
}