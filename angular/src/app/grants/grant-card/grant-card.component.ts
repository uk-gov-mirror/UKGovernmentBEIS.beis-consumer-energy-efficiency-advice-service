import {Component, Input} from "@angular/core";
import {GrantViewModel} from "../model/grant-view-model";

@Component({
    selector: 'app-grant-card',
    templateUrl: './grant-card.component.html',
    styleUrls: ['./grant-card.component.scss']
})
export class GrantCardComponent {
    @Input() grant: GrantViewModel;
}
