import {Component} from "@angular/core";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";

@Component({
    selector: 'app-warmer-home',
    templateUrl: './warmer-home.component.html',
    styleUrls: ['./warmer-home.component.scss']
})
export class WarmerHomeComponent {
    warmerHomeJourneyType: UserJourneyType = UserJourneyType.MakeHomeWarmer;
}
