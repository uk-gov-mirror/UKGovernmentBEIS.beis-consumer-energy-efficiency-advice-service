import {Component} from "@angular/core";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";

@Component({
    selector: 'app-home-improvements',
    templateUrl: './home-improvements.component.html',
    styleUrls: ['./home-improvements.component.scss']
})
export class HomeImprovementsComponent {
    homeImprovementsJourneyType: UserJourneyType = UserJourneyType.PlanHomeImprovements;
}
