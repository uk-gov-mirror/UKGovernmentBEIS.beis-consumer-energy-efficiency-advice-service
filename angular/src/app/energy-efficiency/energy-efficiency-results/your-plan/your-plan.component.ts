import {Component, HostListener, Input, OnInit, DoCheck, ChangeDetectorRef} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "../energy-efficiency-recommendation-card/energy-efficiency-recommendation";
import {sumBy} from "lodash-es";
import {roundToNearest} from "../../../shared/rounding/rounding";

@Component({
    selector: 'app-your-plan',
    templateUrl: './your-plan.component.html',
    styleUrls: ['./your-plan.component.scss']
})
export class YourPlanComponent implements OnInit, DoCheck {

    private static readonly POUNDS_ROUNDING = 5;

    @Input() recommendations: EnergyEfficiencyRecommendation[];

    isFixedPosition: boolean = true;
    yourPlanRowHeightPixels: number;

    ngOnInit() {
        this.updateYourPlanRowPosition();
        this.detectYourPlanRowHeight();
    }

    ngDoCheck() {
        this.detectYourPlanRowHeight();
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

    // Need to manually detect changes in the your-plan row height and assign this to a variable,
    // so that another round of change detection is triggered if the height has changed
    detectYourPlanRowHeight(): void {
        const oldValue = this.yourPlanRowHeightPixels;
        const newValue = document.querySelector('#your-plan').clientHeight;
        if (newValue !== oldValue) {
            this.yourPlanRowHeightPixels = newValue;
        }
    }

    getRoundedTotalSavingsPerMonth(): number {
        const savingsPerMonth = sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerMonth
        );
        return YourPlanComponent.round(savingsPerMonth);
    }

    getRoundedTotalInvestmentRequired(): number {
        const totalInvestment = sumBy(
            this.recommendations,
            recommendation => recommendation.investmentPounds
        );
        return YourPlanComponent.round(totalInvestment);
    }

    private static round(input: number): number {
        const roundingValue =
            input > YourPlanComponent.POUNDS_ROUNDING ?
                YourPlanComponent.POUNDS_ROUNDING : 1;
        return roundToNearest(input, roundingValue);
    }
}