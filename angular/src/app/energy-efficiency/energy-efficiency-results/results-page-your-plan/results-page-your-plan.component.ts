import {Component, DoCheck, HostListener, OnInit, ViewChild} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "../../recommendations/energy-efficiency-recommendation";
import {ResponseData} from "../../../shared/response-data/response-data";

@Component({
    selector: 'app-results-page-your-plan',
    templateUrl: './results-page-your-plan.component.html',
    styleUrls: ['./results-page-your-plan.component.scss']
})
export class ResultsPageYourPlanComponent implements OnInit, DoCheck {

    @ViewChild('yourPlanRow') yourPlanRow;

    isFixedPosition: boolean = true;
    yourPlanRowHeightPixels: number;

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.responseData.energyEfficiencyRecommendationsInPlan;
    }

    constructor(private responseData: ResponseData,) {
    }

    ngOnInit() {
        this.updateYourPlanRowPosition();
        this.yourPlanRowHeightPixels = this.yourPlanRow.nativeElement.clientHeight;
    }

    ngDoCheck() {
        this.yourPlanRowHeightPixels = this.yourPlanRow.nativeElement.clientHeight;
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