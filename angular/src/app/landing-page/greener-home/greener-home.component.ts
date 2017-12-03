import {Component} from "@angular/core";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";

@Component({
    selector: 'app-greener-home',
    templateUrl: './greener-home.component.html',
    styleUrls: ['./greener-home.component.scss']
})
export class GreenerHomeComponent {
    greenerHomeJourneyType: UserJourneyType = UserJourneyType.MakeHomeGreener;
}
