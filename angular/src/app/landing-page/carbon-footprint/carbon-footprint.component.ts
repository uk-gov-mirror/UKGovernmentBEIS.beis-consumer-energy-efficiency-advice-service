import {Component} from "@angular/core";
import {UserJourneyType} from "../../shared/response-data/user-journey-type";

@Component({
    selector: 'app-carbon-footprint',
    templateUrl: './carbon-footprint.component.html',
    styleUrls: ['./carbon-footprint.component.scss']
})
export class CarbonFootprintComponent {
    carbonFootprintJourneyType: UserJourneyType = UserJourneyType.ReduceCarbonFootprint;
}
